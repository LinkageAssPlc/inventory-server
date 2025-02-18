import validate from "express-zod-safe";
import {
  type ZodError,
  type ZodRawShape,
  type ZodSchema,
  type ZodTypeAny,
  z,
} from "zod";

type Validation = ZodTypeAny | ZodRawShape;
const emptyObjectSchema = z.object({}).strict();
type Empty = typeof emptyObjectSchema;

interface ExtendedValidationSchemas<TParams, TQuery, TBody> {
  params?: TParams;
  query?: TQuery;
  body?: TBody;
}

export const baseValidation = <
  TParams extends Validation = Empty,
  TQuery extends Validation = Empty,
  TBody extends Validation = Empty,
>(
  schemas: ExtendedValidationSchemas<TParams, TQuery, TBody>,
) => validate(schemas);
