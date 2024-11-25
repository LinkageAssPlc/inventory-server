import httpStatus from "http-status";

import { AddStaffOrderDTO } from "../DTOs/StaffOrderDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { ProductModel } from "../../inventory-entities/Product";
// import { ItemsListModel } from "../../inventory-entities/ItemsList";
import { Product } from "../../types/user";
import { AddAllMongoDBFields } from "../../inventory-entities/mongodbFields";



export const AddStaffOrderService = async ({staffID, department, branch, inStock, notInStock}: AddStaffOrderDTO) => {
   
    const user = await getUser({userID: staffID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`};

    let shouldError = false;
    let errors: string[] = [];

    //get product ID/names only  if quantity in >= 1 //to be fetched from newStock
    const products = await Promise.all(
        inStock.map( async (item) => {
            const product = await ProductModel.findById(item.productID) as Product
            
            if (!product) {
                shouldError = true
                errors.push(`Product ${item.productID} is invalid`)
            }

            return product as AddAllMongoDBFields<Product>
           
        })
    )

    //Test for duplicates in products selection
    const valueArr = products.map((product) => product._id.toString() )
    const isDuplicate = valueArr.some((product, idx) => {
        return (valueArr.indexOf(product) != idx)
    })
    console.log(isDuplicate)


    if (isDuplicate) {
        errors.push("Sorry, product name has already been selected")
        shouldError = true;
    }

    //get the quantity and units
    //const itemLists = await ItemsListModel.find()
    // itemLists.map(async (itemList) => {
    //     // console.log("ItemList: ", itemList.lists)
    //     itemList.lists.map((item) => {
    //         if (item.quantity >= 1) {
    //             // const product = await ProductModel.findById(item.productID) 
    //             // console.log(product?.name)

    //             return item.productID
    //         }
    //     })
    // })
    //get units



    

    if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    // const newOrder = await StaffOrderModel.create({staffID, department, branch, inStock});
    return {success: true, status: httpStatus.CREATED, message: `New Order created!`, data: null};

}
