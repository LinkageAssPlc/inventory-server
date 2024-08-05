import { Types } from "mongoose";
import { Request } from "express";

import { StaffOrderDTO } from "../../DTOs/StaffOrderDTO";
import { StaffOrderService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class StaffOrderController{
    static staffOrder = BaseController(async (request: Request) => {
        const StaffOrderDTO = request.body as StaffOrderDTO;
        StaffOrderDTO.staffID = new Types.ObjectId(request.token._id);
        const {status, message, data} = await StaffOrderService(StaffOrderDTO)
        return {status, message, data};
    })
}
