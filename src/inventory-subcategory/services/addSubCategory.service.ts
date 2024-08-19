import httpStatus from "http-status";

import { AddSubCategoryDTO } from "../DTOs/SubCategoryDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { SubCategoryModel } from "../../inventory-entities/SubCategory";
import { CategoryModel } from "../../inventory-entities/Category";
// import { Category } from "../../types/user";
// import { AddAllMongoDBFields } from "../../inventory-entities";


export const AddSubCategoryService = async ({userID, name, categoryID}: AddSubCategoryDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const subCatNameExist = await SubCategoryModel.findOne({name})
    if(subCatNameExist) return {success: true, status: httpStatus.OK, message: `sub-category name already exist`, data: subCatNameExist}

    const category = await CategoryModel.findById(categoryID)
    console.log(category)
    if(!category) return {success: false, status: httpStatus.NOT_FOUND, message: `Category name doesn't exist`, data: null}

    const newSubCategory = await SubCategoryModel.create({userID, name, categoryID: category._id});
    
    return {success: true, status: httpStatus.OK, message: `Sub Category name created!`, data: newSubCategory};

}
