import httpStatus from "http-status";

import { StaffOrderDTO } from "../DTOs/StaffOrderDTO";
import { getUser } from "../../inventory-accounts/user/services";



export const StaffOrderService = async ({staffID, department, branch, inStock, notInStock}: StaffOrderDTO) => {
    const user = await getUser({userID: staffID});
    if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    let shouldError = false;
    let errors: any = [];

    //get product names only based if quantity in >= 1 //to be fetched from newStock
    //get the quantity
    //get units



    

    if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

    //const newStock = await NewStockModel.create({userID, itemList});
    return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: null};

}
