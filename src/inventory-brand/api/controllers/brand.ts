import { Types } from "mongoose";
import { Request } from "express";
import httpStatus from "http-status";

import { AddBrandDTO } from "../../DTOs/BrandDTO";
import { addBrandService, getBrandsService, editBrandService, deleteBrandService } from "../../services";
import { BaseController } from "../../../inventory-shared/api";


export class BrandController{
    static addBrand = BaseController(async (request: Request) => {
        const BrandDTO = request.body as AddBrandDTO;
        BrandDTO.userID = new Types.ObjectId(request.token._id);
        const{status, message, data} = await addBrandService(BrandDTO)
        return {status, message, data};
    })

    static getBrands = BaseController(async () => {
        const {status, message, data} = await getBrandsService();
        return {status, message, data};
    })

    static editBrand = BaseController(async (request: Request) => {
        // Try to extract brand ID from multiple possible locations
        let brandID = request.params.brandID;
        
        // Extract from URL path if not found in params
        if (!brandID) {
            const pathParts = request.path.split('/');
            brandID = pathParts[pathParts.length - 1];
            console.log("Extracted brandID from path:", brandID);
        }
        
        // Extract from originalUrl if still not found
        if (!brandID || brandID === "") {
            const urlParts = request.originalUrl.split('/');
            brandID = urlParts[urlParts.length - 1];
            console.log("Extracted brandID from originalUrl:", brandID);
        }
        
        // Validate if brandID is present
        if (!brandID || brandID === "") {
            return {
                status: httpStatus.BAD_REQUEST,
                message: "Brand ID is required",
                data: null
            };
        }
        
        const { name } = request.body;
        const userID = new Types.ObjectId(request.token._id);
        
        console.log("Edit Brand Controller - Final values:", { 
            brandID, 
            name, 
            userID: userID.toString() 
        });
        
        const {status, message, data} = await editBrandService({
            brandID,
            name,
            userID
        });
        
        return {status, message, data};
    })

    static deleteBrand = BaseController(async (request: Request) => {
        console.log("Delete Brand Controller - Request params:", request.params);
        
        // Get brand ID from params
        let brandID = request.params.brandID;
        
        // Validate if brandID is present
        if (!brandID) {
            return {
                status: httpStatus.BAD_REQUEST,
                message: "Brand ID is required",
                data: null
            };
        }
        
        const userID = new Types.ObjectId(request.token._id);
        
        const {status, message, data} = await deleteBrandService({
            brandID,
            userID
        });
        
        return {status, message, data};
    })
}
