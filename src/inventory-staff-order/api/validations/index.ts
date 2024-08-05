import { Joi } from "celebrate";

import { Units } from "../../../types/user";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";

// staffID: ObjectId;
//   department: String;
//   branch: string;
//   inStock: ItemsInStock[];
//   notInStock: ItemsNotInStock[];



export default{
    staffOrder: {
        body: Joi.object({
            staffID: Joi.string().required().min(24).max(24).custom(toObjectId),
            department: Joi.string().required(),
            branch: Joi.string().required(),
            inStock: Joi.array().items(
                Joi.object({
                    productID: Joi.string().min(24).max(24).custom(toObjectId),
                    quantity: Joi.number().required(),
                    unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET).required(),
                })
            ),
            
        })
    }
}