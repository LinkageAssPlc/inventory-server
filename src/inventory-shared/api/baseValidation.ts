// import { celebrate as validate, SchemaOptions } from 'celebrate';
import validate from "express-zod-safe"


export const baseValidation = (SchemaOptions: SchemaOptions) => validate(SchemaOptions, {
  abortEarly: false,
  stripUnknown: true,
});
