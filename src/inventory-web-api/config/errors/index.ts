import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
// import { isCelebrate } from 'celebrate';

import { config } from "../env";
import { ErrorResponseInterface, ExpressErrorInterface } from "../types";
import { APIError, JoiErrorFormatter } from "../../../inventory-shared/errors";

class CustomError {
  static handler(
    error: ExpressErrorInterface,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const response: ErrorResponseInterface = {
      statusCode: error.status,
      //@ts-ignore
      message: error.message || httpStatus[error.status],
      errors: error.errors,
      payload: null,
      stack: error.stack,
    };

    if (config.env !== "development") {
      delete response.stack;
    }
    res.status(error.status).json(response);
  }

  static converter(
    error: ExpressErrorInterface,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    let convertedError: Error = error;
    // if ((error)) {
    //   convertedError = new APIError({
    //     message: 'Invalid fields',
    //     status: httpStatus.BAD_REQUEST,
    //     //@ts-ignore
    //     errors: JoiErrorFormatter(error.joi.details) || {},
    //     payload: {}
    //   });
    // }

    if (!(error instanceof APIError)) {
      convertedError = new APIError({
        message: error.message,
        status: error.status,
        stack: error.stack,
        errors: null,
      });
    }

    //@ts-ignore
    return handler(convertedError, req, res);
  }

  static errorHandler(
    error: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
  ) {
    if (error) {
      //@ts-ignore
      const tokenError = new APIError("Unauthorized", error.status, true);
      next(tokenError);
    }
    next();
  }

  // catch 404 errors
  static notFound(req: Request, res: Response) {
    const error = new APIError({
      message: "Not found",
      status: httpStatus.NOT_FOUND,
      stack: undefined,
      errors: null,
    });

    //@ts-ignore
    return handler(error, req, res);
  }
}

export const error = CustomError;
