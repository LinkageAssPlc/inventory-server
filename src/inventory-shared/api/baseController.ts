// import { Request, Response, NextFunction } from 'express';

// import sendResponse from '../response';
// import { ResponseInterface } from '../types';


// type handleRequestOutput = {
//   status: number,
//   message: string,
//   data?: any
//   errors?: object,
//   token?: string,
// };
// export const BaseController = (handleRequest: (request: Request) => Promise<handleRequestOutput>) => {
//   return async function(
//   	request: Request,
//     response: Response,
//     next: NextFunction,
//   ): Promise<ResponseInterface | void> {
//     try {
//       const {status, message, data, errors, token} = await handleRequest(request);
      

//         return response
//           .status(status)
//           .json(sendResponse(status, message, data || '', errors || null, token || null));
        
//     } catch (error: any) {
//       next(error);
//     }
//   };
// }


// // if(errors instanceof z.ZodError) {
//       //   return response
//       //   .status(status)
//       //   .json({
//       //     message: "Validation Failed",
//       //     error: errors.issues.map((issue) => ({
//       //       path: issue.path.join('.'),
//       //       message: issue.message
//       //     }))
//       //   })
        
//       // } else {}


import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import sendResponse from '../response';
import { ResponseInterface } from '../types';

type HandleRequestOutput = {
  status: number,
  message: string,
  data?: any
  errors?: object,
  token?: string,
};
export const BaseController = (handleRequest: (request: Request) => Promise<HandleRequestOutput>) => {
  return async function(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<ResponseInterface | void> {
    try {
      // Destructure array response
      const {status, message, data, errors, token} = await handleRequest(request);
      
      return response.status(status).json(
        sendResponse(status, message, data || '', errors || null, token || null)
      );
        
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          message: 'Validation failed',
          errors: error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      next(error);
    }
  };
}