import { Types } from "mongoose";
import { Request } from "express";

import { AddStaffOrderDTO } from "../../DTOs/StaffOrderDTO";
import { AddStaffOrderService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class StaffOrderController{
    static addStaffOrder = BaseController(async (request: Request) => {
        const AddStaffOrderDTO = request.body as AddStaffOrderDTO;
        AddStaffOrderDTO.staffID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await AddStaffOrderService(AddStaffOrderDTO)
        return {status, message, data};
    })
}
