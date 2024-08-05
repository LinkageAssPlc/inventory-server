import { Types } from "mongoose";
import { Request } from "express";

import { AddNewStockDTO } from "../../DTOs/NewStockDTO";
import { AddNewStockService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class NewStockController{
    static addNewStock = BaseController(async (request: Request) => {
        const NewStockDTO = request.body as AddNewStockDTO;
        NewStockDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await AddNewStockService(NewStockDTO)
        return {status, message, data};
    })
}
