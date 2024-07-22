import { Types } from "mongoose";
import { Request } from "express";

import { CategoryDTO } from "../../DTOs/CategoryDTO";
import { CategoryService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class CategoryController{
    static category = BaseController(async (request: Request) => {
        const CategoryDTO = request.body as CategoryDTO;
        console.log(CategoryDTO)
        CategoryDTO.userID = new Types.ObjectId(request.token._id);
        console.log(CategoryDTO.userID);
        const{status, message, data} = await CategoryService(CategoryDTO)
        return {status, message, data};
    })
}
