// import { Joi } from "celebrate";


// export default{
//     category: {
//         body: Joi.object({
//             name: Joi.string().min(2).max(24).required(),
//         })
//     }
// }

import { z } from "zod";

export default {
    category: {
        body: z.object({
            name: z.string()
                .min(2, { message: "Name must be at least 2 characters" })
                .max(24, { message: "Name cannot exceed 24 characters" })
        })
    },
    editCategory: {
        params: z.object({
            categoryID: z.string()
                .length(24, { message: "Category ID must be a 24 character hex string" })
        }),
        body: z.object({
            name: z.string()
                .min(2, { message: "Name must be at least 2 characters" })
                .max(24, { message: "Name cannot exceed 24 characters" })
        })
    },
    deleteCategory: {
        params: z.object({
            categoryID: z.string()
                .length(24, { message: "Category ID must be a 24 character hex string" })
        })
    }
};