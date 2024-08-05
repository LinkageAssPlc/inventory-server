import { Types } from "mongoose";
import { Request } from "express";

import { AddProductDTO } from "../../DTOs/ProductDTO";
import { AddProductService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class ProductController{
    static addProduct = BaseController(async (request: Request) => {
        const ProductDTO = request.body as AddProductDTO;
        ProductDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await AddProductService(ProductDTO)
        return {status, message, data};
    })
}
