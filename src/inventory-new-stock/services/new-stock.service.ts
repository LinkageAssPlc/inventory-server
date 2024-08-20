import httpStatus from "http-status";

import { AddNewStockDTO } from "../DTOs/NewStockDTO";
import { getUser } from "../../inventory-accounts/user/services";



export const AddNewStockService = async ({userID, itemsListID}: AddNewStockDTO) => {
    const user = await getUser({userID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    // let shouldError = false;
    // let errors: string[] = [];

    // // let product: Product;

    //  const products = await Promise.all(
    //     itemList.map(
    //         async(item, index) => {
    //             const productExist = await ProductModel.findById(item.productID) as Product
    //             const categoryExist = await CategoryModel.findById(item.categoryID) as Category
    //             const brandExist = await BrandModel.findById(item.brandID) as Brand

    //                 console.log("Products: ",productExist)
    //             if (!productExist ) {
    //                 errors.push(`ProductID of item ${index} is invalid`)
    //                 shouldError = true;

    //             } 
                
    //             if (!categoryExist) {
    //                 errors.push(`CategoryID of item ${index} is invalid`)
    //                 shouldError = true;
    //             }

    //             if (!brandExist) {
    //                 errors.push(`BrandID of item ${index} is invalid`)
    //                 shouldError = true;
    //             }
               
    //             // if (itemList.indexOf(item) != index) {
    //             //     errors.push(`You can't input same product name twice`)
    //             // }

    //             return productExist as AddAllMongoDBFields<Product>

    //         }
    //     )
    // ) 

    // //Test for duplicates in products selection
    // const valueArr = products.map((product) => product._id.toString() )
    // const isDuplicate = valueArr.some((product, idx) => {
    //     return (valueArr.indexOf(product) != idx)
    // })
    // console.log(isDuplicate)


    // if (isDuplicate) {
    //     errors.push("Sorry, product name has already been selected")
    //     shouldError = true;
    // }

    // if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    // const newStock = await NewStockModel.create({userID, itemList});
    return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: null};
}
