import { Types } from "mongoose";
import { Request } from "express";

import { NewStockDTO } from "../../DTOs/NewStockDTO";
import { NewStockService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class NewStockController{
    static newStock = BaseController(async (request: Request) => {
        const NewStockDTO = request.body as NewStockDTO;
        NewStockDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await NewStockService(NewStockDTO)
        return {status, message, data};
    })
}
