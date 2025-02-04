import { Types } from "mongoose";
import { Request } from "express";

import { AddNewEntryDTO } from "../../DTOs/AddNewEntryDTO";
import { AddNewEntryService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class NewEntryController{
    static addNewEntry = BaseController(async (request: Request) => {
        const AddNewEntryDTO = request.body as AddNewEntryDTO;
        AddNewEntryDTO.userID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await AddNewEntryService(AddNewEntryDTO)
        return {status, message, data};
    })
}
