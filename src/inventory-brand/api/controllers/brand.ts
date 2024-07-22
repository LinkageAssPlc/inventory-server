import { Types } from "mongoose";
import { Request } from "express";

import { BrandDTO } from "../../DTOs/BrandDTO";
import { BrandService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class BrandController{
    static brand = BaseController(async (request: Request) => {
        const BrandDTO = request.body as BrandDTO;
        BrandDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await BrandService(BrandDTO)
        return {status, message, data};
    })
}
