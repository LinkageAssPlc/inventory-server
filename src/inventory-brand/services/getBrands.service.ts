import httpStatus from "http-status";
import { BrandModel } from "../../inventory-entities/Brand";

export const getBrandsService = async () => {
    const brands = await BrandModel.find().sort({ name: 1 });
    return {
        success: true,
        status: httpStatus.OK,
        message: "Brands retrieved successfully",
        data: brands
    };
}; 