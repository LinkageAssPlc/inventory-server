// import { Joi } from "celebrate";
import {z} from "zod"

import { Units } from "../../../types/user";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";


// export default{
//     itemsList: {
//         body: Joi.object({
//             lists: Joi.array().items(
//                 Joi.object({
//                     productID: Joi.string().min(24).max(24).custom(toObjectId),
//                     categoryID: Joi.string().min(24).max(24).custom(toObjectId),
//                     brandID: Joi.string().min(24).max(24).custom(toObjectId),
//                     quantity: Joi.number().required(),
//                     price: Joi.number().required(),
//                     unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET).required(),
//                     isInStock: Joi.boolean()
//                 })
//             ),
            
//         })
//     }
// }


// Create reusable ObjectID schema
const objectIdSchema = z.string()
  .length(24, { message: "Must be a 24 character hex string" })
  .transform(toObjectId)
  .describe("MongoDB ObjectID");

export default {
  itemsList: {
    body: z.object({
      lists: z.array(
        z.object({
          productID: objectIdSchema,
          categoryID: objectIdSchema,
          brandID: objectIdSchema,
          quantity: z.number().positive("Quantity must be positive"),
          price: z.number().positive("Price must be positive"),
          unit: z.nativeEnum(Units, {
            errorMap: () => ({ 
              message: `Unit must be one of: ${Object.values(Units).join(", ")}` 
            })
          }),
          isInStock: z.boolean().optional()
        }).strict()
      ).min(1, "At least one item required")
    })
  }
};