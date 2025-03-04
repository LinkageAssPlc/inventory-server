// import { Joi } from "celebrate";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";

// export default{
//     subCategory: {
//         body: Joi.object({
//             name: Joi.string().min(2).max(24).required(),
//             categoryID: Joi.string().min(24).max(24).custom(toObjectId),
//         })
//     }
// }

import {z} from "zod"

const objectIdSchema = z.string()
  .length(24, "Must be a 24 character MongoDB ObjectID")
  .transform(toObjectId)
  .describe("Valid MongoDB ObjectID");

export default {
    subCategory: {
        body: z.object({
            name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(24, "Name cannot exceed 24 characters"),
        categoryID: objectIdSchema
        }).strict()
    }
}