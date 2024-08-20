import httpStatus from "http-status";

import { AddStaffOrderDTO } from "../DTOs/StaffOrderDTO";
import { getUser } from "../../inventory-accounts/user/services";
// import { StaffOrderModel } from "../../inventory-entities/StaffOrder";
// import { ProductModel } from "../../inventory-entities/Product";
// import { NewStockModel } from "../../inventory-entities/NewStock";
// import { AddNewStockDTO } from "src/inventory-new-stock/DTOs/NewStockDTO";
// import { multiwait } from "../../inventory-shared/multiwait";



export const AddStaffOrderService = async ({staffID, department, branch, inStock, notInStock}: AddStaffOrderDTO) => {
   
    const user = await getUser({userID: staffID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`};

    // let shouldError = false;
    // let errors: string[] = [];

    // //get product ID/names only  if quantity in >= 1 //to be fetched from newStock
    // await Promise.all(
    //     inStock.map( async (item) => {
    //         const product = await ProductModel.findById(item.productID)
    //         const newStocks = await NewStockModel.find()
    //         console.log("Product Exist: ", product?.id)
    //         console.log("NewStock: ", newStocks)
    //         if (!product) {
    //             shouldError = true
    //             errors.push(`Product ${item.productID} is invalid`)
    //         }
           

    //         newStocks.map((newStock) => {
    //             newStock.itemList.map(async (item) => {
    //                 if (item.quantity >= 1) {
    //                     // console.log(item.productID)
    //                     const product = await ProductModel.findById(item.productID) 
    //                     console.log(product?.name)
    //                 }
    //             })
    //         })

            
    //     })
    // )
    // //get the quantity
    // //get units



    

    // if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    // const newOrder = await StaffOrderModel.create({staffID, department, branch, inStock});
    return {success: true, status: httpStatus.CREATED, message: `New Order created!`, data: null};

}
