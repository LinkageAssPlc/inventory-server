import httpStatus from "http-status";

import { ProductDTO } from "../DTOs/ProductDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { ProductModel } from "../../inventory-entities/Product";


export const ProductService = async ({userID, name}: ProductDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const productNameExist = await ProductModel.findOne({name})
    if(productNameExist) return {success: true, status: httpStatus.OK, message: `Product name already exist`, data: productNameExist}

    const newProduct = await ProductModel.create({userID, name});
    return {success: true, status: httpStatus.OK, message: `Product name created!`, data: newProduct};

}
