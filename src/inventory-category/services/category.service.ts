import httpStatus from "http-status";

import { CategoryDTO } from "../DTOs/CategoryDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { CategoryModel } from "../../inventory-entities/Category";


export const CategoryService = async ({userID, name, parent}: CategoryDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const catNameExist = await CategoryModel.findOne({name})
    if(catNameExist) return {success: true, status: httpStatus.OK, message: `category name already exist`, data: catNameExist}

    const newCategory = await CategoryModel.create({name, parent});
    return {success: true, status: httpStatus.OK, message: `Category name created!`, data: newCategory};

}
