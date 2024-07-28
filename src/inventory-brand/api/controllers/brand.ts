import { Types } from "mongoose";
import { Request } from "express";

import { AddBrandDTO } from "../../DTOs/BrandDTO";
import { addBrandService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class BrandController{
    static addBrand = BaseController(async (request: Request) => {
        const BrandDTO = request.body as AddBrandDTO;
        BrandDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await addBrandService(BrandDTO)
        return {status, message, data};
    })
}
