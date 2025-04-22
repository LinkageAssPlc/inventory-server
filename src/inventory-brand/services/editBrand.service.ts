import httpStatus from "http-status";
import { ObjectId } from "mongodb";
import escapeStringRegexp from "escape-string-regexp-node";

import { BrandModel } from "../../inventory-entities/Brand";
import { getUser } from "../../inventory-accounts/user/services";

export interface EditBrandDTO {
    brandID: string;
    name: string;
    userID: ObjectId;
}

export const editBrandService = async ({ brandID, name, userID }: EditBrandDTO) => {
    
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}
    
    // Validate brandID
    if (!brandID || brandID === "undefined") {
        return {
            success: false,
            status: httpStatus.BAD_REQUEST,
            message: "Brand ID is required",
            data: null
        };
    }
    
    // Check if brand exists
    try {
        const brand = await BrandModel.findById(brandID);
        if (!brand) {
            return {
                success: false,
                status: httpStatus.NOT_FOUND,
                message: "Brand not found",
                data: null
            };
        }

        // Check if new name already exists (excluding current brand)
        const nameExists = await BrandModel.findOne({
            _id: { $ne: brandID },
            name: { $regex: new RegExp(`^${escapeStringRegexp(name)}$`, "i") }
        });

        if (nameExists) {
            return {
                success: false,
                status: httpStatus.BAD_REQUEST,
                message: "Brand name already exists",
                data: null
            };
        }

        // Update the brand
        const updatedBrand = await BrandModel.findByIdAndUpdate(
            brandID,
            { name, updatedAt: new Date() },
            { new: true }
        );

        return {
            success: true,
            status: httpStatus.OK,
            message: "Brand updated successfully",
            data: updatedBrand
        };
    } catch (error) {
        console.error("Error in editBrandService:", error);
        return {
            success: false,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to update brand",
            data: null
        };
    }
}; 