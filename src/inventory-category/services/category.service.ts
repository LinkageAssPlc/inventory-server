import httpStatus from "http-status";
import escapeStringRegexp from "escape-string-regexp-node";

import { AddCategoryDTO } from "../DTOs/CategoryDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { CategoryModel } from "../../inventory-entities/Category";


export const AddCategoryService = async ({userID, name}: AddCategoryDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const catNameExist = await CategoryModel.findOne({name: {
        $regex: new RegExp(`^${escapeStringRegexp(name)}$`, "i")
    }})
    if(catNameExist) return {success: true, status: httpStatus.BAD_REQUEST, message: `Category name already exist`, data: catNameExist}

    const newCategory = await CategoryModel.create({userID, name});
    return {success: true, status: httpStatus.OK, message: `Category name created!`, data: newCategory};

}

