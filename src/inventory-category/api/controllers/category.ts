import { Types } from "mongoose";
import { Request } from "express";

import { AddCategoryDTO } from "../../DTOs/CategoryDTO";
import { AddCategoryService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class CategoryController{
    static addCategory = BaseController(async (request: Request) => {
        const CategoryDTO = request.body as AddCategoryDTO;
        CategoryDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await AddCategoryService(CategoryDTO)
        return {status, message, data};
    })
}
