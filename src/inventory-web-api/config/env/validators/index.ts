// import { Joi } from "celebrate";
import { z } from "zod";

// parse using zod instead of joi
// export const Validate = (schema: any) =>
//   Joi.object().keys(schema).unknown().required();

export const Validate = (schema: any) => z.object(schema).safeParse;
