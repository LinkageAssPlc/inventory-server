import httpStatus from "http-status";

import { NewStockDTO } from "../DTOs/NewStockDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { NewStockModel } from "../../inventory-entities/NewStock";
import { ProductModel } from "../../inventory-entities/Product";
import { CategoryModel } from "../../inventory-entities/Category";
import { BrandModel } from "../../inventory-entities/Brand";
import { Brand, Category, Product } from "../../types/user";


export const NewStockService = async ({userID, itemList}: NewStockDTO) => {
    const user = await getUser({userID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    let shouldError = false;
    let errors: string[] = [];

    // let product: Product;

    await Promise.all(
        itemList.map(
            async(item, index) => {
                const productExist = await ProductModel.findById(item.productID) as Product
                const categoryExist = await CategoryModel.findById(item.categoryID) as Category
                const brandExist = await BrandModel.findById(item.brandID) as Brand
            
                if (!productExist || !categoryExist || !brandExist) {
                    shouldError = true;
                }
            
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

            }
        )
    )

    if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    const newStock = await NewStockModel.create({userID, itemList});
    return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: newStock};
}
