import httpStatus from "http-status";
import { ObjectId } from "mongodb";

import { BrandModel } from "../../inventory-entities/Brand";
import { getUser } from "../../inventory-accounts/user/services";

export interface DeleteBrandDTO {
    brandID: string;
    userID: ObjectId;
}

export const deleteBrandService = async ({ brandID, userID }: DeleteBrandDTO) => {
    // Check if user exists
    const user = await getUser({userID});
    if(!user) return {
        success: false, 
        status: httpStatus.NOT_FOUND, 
        message: `User not found`, 
        data: null
    };
    
    // Validate brandID
    if (!brandID) {
        return {
            success: false,
            status: httpStatus.BAD_REQUEST,
            message: "Brand ID is required",
            data: null
        };
    }
    
    try {
        // Check if brand exists
        const brand = await BrandModel.findById(brandID);
        if (!brand) {
            return {
                success: false,
                status: httpStatus.NOT_FOUND,
                message: "Brand not found",
                data: null
            };
        }
        
        // Delete the brand
        await BrandModel.findByIdAndDelete(brandID);
        
        return {
            success: true,
            status: httpStatus.OK,
            message: "Brand deleted successfully",
            data: brand
        };
    } catch (error) {
        console.error("Error in deleteBrandService:", error);
        return {
            success: false,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to delete brand",
            data: null
        };
    }
}; 