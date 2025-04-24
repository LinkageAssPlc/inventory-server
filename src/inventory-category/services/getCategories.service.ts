import httpStatus from "http-status";
import { CategoryModel } from "../../inventory-entities/Category";



export const getCategoriesService = async () => {
    const categories = await CategoryModel.find().sort({ name: 1 });
    return {
        success: true,
        status: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: categories
    };
}; 