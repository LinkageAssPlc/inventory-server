import { Joi } from "celebrate";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";
import { Units } from "../../../types/user";


export const addProductValidation =  {
    addProduct: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
            brandID: Joi.string().min(24).max(24).custom(toObjectId).required(),
            categoryID: Joi.string().min(24).max(24).custom(toObjectId).required(),
            quantity: Joi.number().required(),
            unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET).required(),
        })
    }
}

export const addProductNameValidation = {
    addProductName: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
        })
    }
}