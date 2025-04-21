import { z } from "zod";

export default {
  brand: {
    body: z.object({
      name: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(24, { message: "Name cannot exceed 24 characters" })
    })
  }
};