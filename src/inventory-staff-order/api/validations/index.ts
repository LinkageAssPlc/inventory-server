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
            itemList: Joi.array().items(
                Joi.object({
                    productID: Joi.string().min(24).max(24).custom(toObjectId),
                    categoryID: Joi.string().min(24).max(24).custom(toObjectId),
                    brandID: Joi.string().min(24).max(24).custom(toObjectId),
                    quantity: Joi.number().required(),
                    price: Joi.number().required(),
                    unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS).required(),
                    isInStock: Joi.boolean()
                })
            ),
            
        })
    }
}