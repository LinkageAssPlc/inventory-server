import { z } from "zod";

export default {
  brand: {
    body: z.object({
      name: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(24, { message: "Name cannot exceed 24 characters" })
    })
  },
  editBrand: {
    params: z.object({
      brandId: z.string()
        .length(24, { message: "Brand ID must be a 24 character hex string" })
    }),
    body: z.object({
      name: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(24, { message: "Name cannot exceed 24 characters" })
    })
  }
};