import httpStatus from "http-status";

import { AddNewItemsListDTO } from "../DTOs/ItemsListDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { NewStockModel } from "../../inventory-entities/NewStock";
import { ProductModel } from "../../inventory-entities/Product";
import { CategoryModel } from "../../inventory-entities/Category";
import { BrandModel } from "../../inventory-entities/Brand";
import { Brand, Category, Product } from "../../types/user";
import { AddAllMongoDBFields } from "../../inventory-entities";
import { ItemsListModel } from "../../inventory-entities/ItemsList";


export const AddNewItemsListService = async ({userID, lists}: AddNewItemsListDTO) => {
    const user = await getUser({userID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    let shouldError = false;
    let errors: string[] = [];

    // let product: Product;

     const products = await Promise.all(
        lists.map(
            async(item, index) => {
                const productExist = await ProductModel.findById(item.productID) as Product
                const categoryExist = await CategoryModel.findById(item.categoryID) as Category
                const brandExist = await BrandModel.findById(item.brandID) as Brand

                    //console.log("ProductExist: ",productExist)
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

    //console.log("Product: ", products)

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

    //create ItemsList
    const newItemsList = await ItemsListModel.create({userID, lists});
    // console.log("newListsID: ", newItemsList._id)
    // const newItemsListID = await ItemsListModel.findById(newItemsList._id); 
    const newStock = await NewStockModel.create({userID, itemsListID: newItemsList._id});

    return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: newStock};
}
