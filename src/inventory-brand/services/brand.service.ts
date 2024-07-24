import httpStatus from "http-status";

import { BrandDTO } from "../DTOs/BrandDTO";
import { getUser } from "../../inventory-accounts/user/services";
import { BrandModel } from "../../inventory-entities/Brand";


export const BrandService = async ({userID, name}: BrandDTO) => {
    const user = await getUser({userID});
    if(!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

    const brandNameExist = await BrandModel.findOne({name})
    if(brandNameExist) return {success: true, status: httpStatus.OK, message: `brand name already exist`, data: brandNameExist}

    const newBrand = await BrandModel.create({userID, name});
    return {success: true, status: httpStatus.OK, message: `Brand name created!`, data: newBrand};

}
