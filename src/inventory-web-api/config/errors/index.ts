// import { Request, Response, NextFunction } from "express";
// import httpStatus from "http-status";
// // import { isCelebrate } from 'celebrate';

// import { config } from "../env";
// import { ErrorResponseInterface, ExpressErrorInterface } from "../types";
// import { APIError } from "../../../inventory-shared/errors";

// class CustomError {
//   static handler(
//     error: ExpressErrorInterface,
//     _req: Request,
//     res: Response,
//     _next: NextFunction
//   ) {
//     const response: ErrorResponseInterface = {
//       statusCode: error.status,
//       //@ts-ignore
//       message: error.message || httpStatus[error.status],
//       errors: error.errors,
//       payload: null,
//       stack: error.stack,
//     };

//     if (config.env !== "development") {
//       delete response.stack;
//     }
//     res.status(error.status).json(response);
//   }

//   static converter(
//     error: ExpressErrorInterface,
//     req: Request,
//     res: Response,
//     _next: NextFunction
//   ) {
//     let convertedError: Error = error;
//     if ((error)) {
//       convertedError = new APIError({
//         message: 'Invalid fields',
//         status: httpStatus.BAD_REQUEST,
//         //@ts-ignore
//         errors: JoiErrorFormatter(error) || {},
//         payload: {}
//       });
//     }

//     if (!(error instanceof APIError)) {
//       convertedError = new APIError({
//         message: error.message,
//         status: error.status,
//         stack: error.stack,
//         errors: null,
//       });
//     }

//     //@ts-ignore
//     return handler(convertedError, req, res);
//   }

//   static errorHandler(
//     error: Error,
//     _req: Request,
//     _res: Response,
//     next: NextFunction
//   ) {
//     if (error) {
//       //@ts-ignore
//       const tokenError = new APIError("Unauthorized", error.status, true);
//       next(tokenError);
//     }
//     next();
//   }

//   // catch 404 errors
//   static notFound(req: Request, res: Response) {
//     const error = new APIError({
//       message: "Not found",
//       status: httpStatus.NOT_FOUND,
//       stack: undefined,
//       errors: null,
//     });

//     //@ts-ignore
//     return handler(error, req, res);
//   }
// }

// export const error = CustomError;
// Update your error handler to always set a status code



import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const error= (
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({ // <-- Explicit status code
      error: 'Validation Error',
      details: err.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  // Handle other errors
  const statusCode = (err as any).statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  return res.status(statusCode).json({ // <-- Ensure status code is set
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};