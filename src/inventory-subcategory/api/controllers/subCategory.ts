import { Types } from "mongoose";
import { Request } from "express";

import { AddSubCategoryDTO } from "../../DTOs/SubCategoryDTO";
import { AddSubCategoryService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class SubCategoryController{
    static addSubCategory = BaseController(async (request: Request) => {
        const AddSubCategoryDTO = request.body as AddSubCategoryDTO;
        AddSubCategoryDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await AddSubCategoryService(AddSubCategoryDTO)
        return {status, message, data};
    })
}
