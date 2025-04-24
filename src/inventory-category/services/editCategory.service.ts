import httpStatus from "http-status";
import { ObjectId } from "mongodb";
import escapeStringRegexp from "escape-string-regexp-node";

import { CategoryModel } from "../../inventory-entities/Category";
import { getUser } from "../../inventory-accounts/user/services";

export interface EditCategoryDTO {
    categoryID: string;
    name: string;
    userID: ObjectId;
}

export const editCategoryService = async ({ categoryID, name, userID }: EditCategoryDTO) => {
    // Check if user exists
    const user = await getUser({userID});
    if(!user) return {
        success: false, 
        status: httpStatus.NOT_FOUND, 
        message: `User not found`, 
        data: null
    };
    
    // Check if category exists
    const category = await CategoryModel.findById(categoryID);
    if (!category) {
        return {
            success: false,
            status: httpStatus.NOT_FOUND,
            message: "Category not found",
            data: null
        };
    }

    // Check if new name already exists (excluding current category)
    const nameExists = await CategoryModel.findOne({
        _id: { $ne: categoryID },
        name: { $regex: new RegExp(`^${escapeStringRegexp(name)}$`, "i") }
    });

    if (nameExists) {
        return {
            success: false,
            status: httpStatus.BAD_REQUEST,
            message: "Category name already exists",
            data: null
        };
    }

    // Update the category
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryID,
        { name, updatedAt: new Date() },
        { new: true }
    );

    return {
        success: true,
        status: httpStatus.OK,
        message: "Category updated successfully",
        data: updatedCategory
    };
}; 