import { Types } from "mongoose";
import { Request } from "express";

import { AddBrandDTO } from "../../DTOs/BrandDTO";
import { addBrandService, getBrandsService, editBrandService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class BrandController{
    static addBrand = BaseController(async (request: Request) => {
        const BrandDTO = request.body as AddBrandDTO;
        BrandDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await addBrandService(BrandDTO)
        return {status, message, data};
    })

    static getBrands = BaseController(async () => {
        const {status, message, data} = await getBrandsService();
        return {status, message, data};
    })

    static editBrand = BaseController(async (request: Request) => {
        const brandID = request.params.brandId;
        const { name } = request.body;
        const userID = new Types.ObjectId(request.token._id);
        
        const {status, message, data} = await editBrandService({
            brandID,
            name,
            userID
        });
        
        return {status, message, data};
    })
}
