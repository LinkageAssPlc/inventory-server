import { Types } from "mongoose";
import { Request } from "express";

import { ProductDTO } from "../../DTOs/ProductDTO";
import { ProductService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class ProductController{
    static product = BaseController(async (request: Request) => {
        const ProductDTO = request.body as ProductDTO;
        ProductDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await ProductService(ProductDTO)
        return {status, message, data};
    })
}
