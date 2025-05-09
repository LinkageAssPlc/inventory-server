
// import { Request, Response, NextFunction } from 'express';
// import { z, ZodError } from 'zod'; // Import ZodError explicitly
// import { StatusCodes } from 'http-status-codes';

// export function validateData(schema: z.ZodObject<any>) {
  
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema._parse(req.body); // Use parseAsync for async validation
//       next();
//     } catch (error) {
//       console.log(error)
//       if (error instanceof ZodError) { // Check if error is a ZodError
//         const issues = error.issues; // Access issues directly
        
//         const formattedErrors = issues.map((issue) => ({
//           field: issue.path.join('.'),
//           message: issue.message,
//         }));
        
//         res.status(StatusCodes.BAD_REQUEST).json({ 
//           error: 'Invalid data', 
//           details: formattedErrors 
//         });
        
//       } else {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
//           error: 'Internal Server Error' 
//         });
//       }
//     }
//   };
// }
