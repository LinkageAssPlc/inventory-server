import { Types } from "mongoose";
import { Request } from "express";

import { AddNewItemsListDTO } from "../../DTOs/ItemsListDTO";
import { AddNewItemsListService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class AddNewItemsListController{
    static addNewItemsList = BaseController(async (request: Request) => {
        const AddNewItemsListDTO = request.body as AddNewItemsListDTO;
        AddNewItemsListDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await AddNewItemsListService(AddNewItemsListDTO)
        return {status, message, data};
    })
}
