import httpStatus from "http-status";

import { AddCategoryDTO } from "../DTOs/CategoryDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { CategoryModel } from "../../inventory-entities/Category";


export const AddCategoryService = async ({userID, name}: AddCategoryDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const catNameExist = await CategoryModel.findOne({name})
    if(catNameExist) return {success: true, status: httpStatus.OK, message: `category name already exist`, data: catNameExist}

    const newCategory = await CategoryModel.create({userID, name});
    return {success: true, status: httpStatus.OK, message: `Category name created!`, data: newCategory};

}
