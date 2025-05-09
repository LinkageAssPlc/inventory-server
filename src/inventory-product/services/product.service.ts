import httpStatus from "http-status";

import { AddProductDTO } from "../DTOs/ProductDTO";
import { AddProductNameDTO} from "../DTOs/AddProductNameDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { ProductModel } from "../../inventory-entities/Product";
import { BrandModel } from "../../inventory-entities/Brand";
import { CategoryModel } from "../../inventory-entities/Category";
import { ProductNameModel } from "../../inventory-entities/ProductName";


export const AddProductService = async ({userID, name, brandID, categoryID, quantity, unit}: AddProductDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const productNameExist = await ProductModel.findOne({name})
    if(productNameExist) return {success: false, status: httpStatus.CONFLICT, message: `Product name already exist`, data: productNameExist}

    const brandExist = await BrandModel.findById(brandID)
    if(!brandExist) return {success: false, status: httpStatus.NOT_FOUND, message: `Brand name doesn't exist`, data: brandExist}

    const categoryExist = await CategoryModel.findById(categoryID)
    if(!categoryExist) return {success: false, status: httpStatus.NOT_FOUND, message: `Category name doesn't exist`, data: categoryExist}

    const newProduct = await ProductModel.create({userID, name, brandID, categoryID, quantity, unit});
    return {success: true, status: httpStatus.OK, message: `Product created!`, data: newProduct};

}


export const AddProductNameService = async ({userID, name}: AddProductNameDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const productNameExist = await ProductNameModel.findOne({name})
    if(productNameExist) return {success: false, status: httpStatus.CONFLICT, message: `Product name already exist`, data: productNameExist}

    const newProductName = await ProductNameModel.create({userID, name});
    return {success: true, status: httpStatus.OK, message: `Product name created!`, data: newProductName};
}