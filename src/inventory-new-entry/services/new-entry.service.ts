import httpStatus from "http-status";

import { AddNewEntryDTO } from "../DTOs/AddNewEntryDTO";

import { getUser } from "../../inventory-accounts/user/services";
import { NewEntryModel } from "../../inventory-entities/NewEntry";
import { ProductModel } from "../../inventory-entities/Product";
import { CategoryModel } from "../../inventory-entities/Category";
import { BrandModel } from "../../inventory-entities/Brand";
import { Brand, Category, Product } from "../../types/user";
import { AddAllMongoDBFields } from "../../inventory-entities";



export const AddNewEntryService = async ({userID, lists}: AddNewEntryDTO) => {
    const user = await getUser({userID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    let shouldError = false;
    let errors: string[] = [];

    // let product: Product;

     const products = await Promise.all(
        lists.map(
            async(list, index) => {
                const productExist = await ProductModel.findById(list.productID) as Product
                const categoryExist = await CategoryModel.findById(list.categoryID) as Category
                const brandExist = await BrandModel.findById(list.brandID) as Brand

                     console.log("Products: ",productExist)
                if (!productExist ) {
                    errors.push(`ProductID of item ${index} is invalid`)
                    shouldError = true;

                } 
                
                if (!categoryExist) {
                    errors.push(`CategoryID of item ${index} is invalid`)
                    shouldError = true;
                }

                if (!brandExist) {
                    errors.push(`BrandID of item ${index} is invalid`)
                    shouldError = true;
                }
               
                // if (itemList.indexOf(item) != index) {
                //     errors.push(`You can't input same product name twice`)
                // }

                return productExist as AddAllMongoDBFields<Product>

            }
        )
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

    if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    const newEntry = await NewEntryModel.create({userID, lists});

    return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: newEntry};
}
