import { Types } from "mongoose";
import { Request } from "express";
import httpStatus from "http-status";

import { AddCategoryDTO } from "../../DTOs/CategoryDTO";
import { AddCategoryService, getCategoriesService, editCategoryService, deleteCategoryService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class CategoryController{
    static addCategory = BaseController(async (request: Request) => {
        const CategoryDTO = request.body as AddCategoryDTO;
        CategoryDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await AddCategoryService(CategoryDTO)
        return {status, message, data};
    })

    static getCategories = BaseController(async () => {
        const {status, message, data} = await getCategoriesService();
        return {status, message, data};
    })

    static editCategory = BaseController(async (request: Request) => {
        let categoryID = request.params.categoryID;
        const { name } = request.body;
        const userID = new Types.ObjectId(request.token._id);

        // Extract from URL path if not found in params
        if (!categoryID) {
            const pathParts = request.path.split('/');
            categoryID = pathParts[pathParts.length - 1];
            console.log("Extracted categoryID from path:", categoryID);
        }
        
        // Extract from originalUrl if still not found
        if (!categoryID || categoryID === "") {
            const urlParts = request.originalUrl.split('/');
            categoryID = urlParts[urlParts.length - 1];
            console.log("Extracted categoryID from originalUrl:", categoryID);
        }
        
        // Validate if categoryID is present
        if (!categoryID || categoryID === "") {
            return {
                status: httpStatus.BAD_REQUEST,
                message: "Brand ID is required",
                data: null
            };
        }
        
        const {status, message, data} = await editCategoryService({
            categoryID: categoryID, // Map to the service parameter name
            name,
            userID
        });
        
        return {status, message, data};
    })

    static deleteCategory = BaseController(async (request: Request) => {
        const categoryID = request.params.categoryID;
        const userID = new Types.ObjectId(request.token._id);
        if (!categoryID) {
            return {
                status: httpStatus.BAD_REQUEST,
                message: "CategoryID is required",
                data: null
            };
        }
        
        const {status, message, data} = await deleteCategoryService({
            categoryID: categoryID, // Map to the service parameter name
            userID
        });
        
        return {status, message, data};
    })
}
