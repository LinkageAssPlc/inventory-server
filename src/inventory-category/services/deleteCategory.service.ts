import httpStatus from "http-status";
import { ObjectId } from "mongodb";

import { CategoryModel } from "../../inventory-entities/Category";
import { getUser } from "../../inventory-accounts/user/services";

export interface DeleteCategoryDTO {
    categoryID: string;
    userID: ObjectId;
}

export const deleteCategoryService = async ({ categoryID, userID }: DeleteCategoryDTO) => {
    // Check if user exists
    const user = await getUser({userID});
    if(!user) return {
        success: false, 
        status: httpStatus.NOT_FOUND, 
        message: `User not found`, 
        data: null
    };
    
    // Validate categoryID
    if (!categoryID) {
        return {
            success: false,
            status: httpStatus.BAD_REQUEST,
            message: "Category ID is required",
            data: null
        };
    }
    
    try {
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
        
        // Delete the category
        await CategoryModel.findByIdAndDelete(categoryID);
        
        return {
            success: true,
            status: httpStatus.OK,
            message: "Category deleted successfully",
            data: category
        };
    } catch (error) {
        console.error("Error in deleteCategoryService:", error);
        return {
            success: false,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to delete category",
            data: null
        };
    }
}; 