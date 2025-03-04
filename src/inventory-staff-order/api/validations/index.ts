// import { Joi } from "celebrate";

import { Units } from "../../../types/user";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";


// export default{
//     addStaffOrder: {
//         body: Joi.object({
//             staffID: Joi.string().required().min(24).max(24).custom(toObjectId),
//             department: Joi.string().required(),
//             branch: Joi.string().required(),
//             inStock: Joi.array().items(
//                 Joi.object({
//                     productID: Joi.string().min(24).max(24).custom(toObjectId),
//                     quantity: Joi.number().required(),
//                     unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET).required(),
//                 })
//             ),
//             notInStock: Joi.array().items(
//                 Joi.object({
//                     productName: Joi.string(),
//                     quantity: Joi.number(),
//                     unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET)
//                 })
//             )
            
//         })
//     }
// }

import { z } from "zod";


// Reusable schemas
const objectIdSchema = z.string()
  .length(24, "Must be a 24 character MongoDB ObjectID")
  .transform(toObjectId)
  .describe("Valid MongoDB ObjectID");

const unitSchema = z.nativeEnum(Units, {
  errorMap: () => ({
    message: `Unit must be one of: ${Object.values(Units).join(", ")}`
  })
});

export default {
  addStaffOrder: {
    body: z.object({
      staffID: objectIdSchema,
      department: z.string().min(1, "Department is required"),
      branch: z.string().min(1, "Branch is required"),
      inStock: z.array(
        z.object({
          productID: objectIdSchema,
          quantity: z.number()
            .positive("Quantity must be positive")
            .int("Quantity must be an integer"),
          unit: unitSchema
        }).strict()
      ).min(1, "At least one in-stock item required"),
      notInStock: z.array(
        z.object({
          productName: z.string().min(1, "Product name required").optional(),
          quantity: z.number()
            .positive("Quantity must be positive when provided")
            .int("Quantity must be an integer")
            .optional(),
          unit: unitSchema.optional()
        }).strict()
      ).optional()
    }).strict().refine(data => 
      data.inStock.length === 0, 
      "Must have at least one item in stock"
    )
  }
};