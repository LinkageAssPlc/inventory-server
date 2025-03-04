// import { Joi } from "celebrate";
import {z} from "zod"
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";
import { Units } from "../../../types/user";


// export const addProductValidation =  {
//     addProduct: {
//         body: Joi.object({
//             name: Joi.string().min(2).max(24).required(),
//             brandID: Joi.string().min(24).max(24).custom(toObjectId).required(),
//             categoryID: Joi.string().min(24).max(24).custom(toObjectId).required(),
//             quantity: Joi.number().required(),
//             unit: Joi.string().allow(Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET).required(),
//         })
//     }
// }

// export const addProductNameValidation = {
//     addProductName: {
//         body: Joi.object({
//             name: Joi.string().min(2).max(24).required(),
//         })
//     }
// }





const objectIdSchema = z.string()
  .length(24, { message: "Must be a 24 character hex string" })
  .transform(toObjectId)
  .describe("MongoDB ObjectID");


  export const addProductValidation = {
    addProduct: {
        body: z.object({
          name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(24, "Name cannot exceed 24 characters"),
          brandID: objectIdSchema,
          categoryID: objectIdSchema,
          quantity: z.number()
            .positive("Quantity must be a positive number")
            .int("Quantity must be an integer"),
          unit: z.nativeEnum(Units, {
            errorMap: () => ({
              message: `Invalid unit type. Valid options: ${Object.values(Units).join(", ")}`
            })
          })
        }).strict() // Prevent unknown properties
      }
  }

  export const addProductNameValidation = {
    addProductName: {
        body: z.object({
            name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(24, "Name cannot exceed 24 characters"),
        }).strict()
    }
  }

// export default {
//   itemsList: {
//     body: z.object({
//       lists: z.array(
//         z.object({
//           productID: objectIdSchema,
//           categoryID: objectIdSchema,
//           brandID: objectIdSchema,
//           quantity: z.number().positive("Quantity must be positive"),
//           price: z.number().positive("Price must be positive"),
//           unit: z.nativeEnum(Units, {
//             errorMap: () => ({ 
//               message: `Unit must be one of: ${Object.values(Units).join(", ")}` 
//             })
//           }),
//           isInStock: z.boolean().optional()
//         }).strict()
//       ).min(1, "At least one item required")
//     })
//   }
// };