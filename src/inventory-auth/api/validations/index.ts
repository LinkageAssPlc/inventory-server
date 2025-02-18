// import { Joi } from 'celebrate';
import {z} from "zod"



export const signUpSchema = z.object({
  body: z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    department: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(8).nonempty(),
    confirmPassword: z.string().min(8).nonempty(),
  })
});

export const signInSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
})


// export default  {
//   // signUp: {
//   //   body: Joi.object({
//   //     firstname: Joi.string().min(2).max(20).required().messages({
//   //       "any.required": "Firstname is compulsory!"
//   //     }),
//   //     lastname: Joi.string().max(20).required(),
//   //     department: Joi.string().required(),
//   //     email: Joi.string().email().required(),
//   //     password: Joi.string().min(9).required(),
//   //     confirmPassword: Joi.string().min(9),
//   //   })
//   // },
//   signIn: {
//     body: Joi.object({
//       email: Joi.string().required(),
//       password: Joi.string().min(8).required(),
//     })
//   },
//   sendOTP: {
//     body: Joi.object({
//       email: Joi.string().required(),
//     }) 
//   },
//   verifyOTP: {
//     body: Joi.object({
//       email: Joi.string().required(),
//       otp: Joi.string().required()
//     })
//   },
//   resetPassword: {
//     body: Joi.object({
//       email: Joi.string().required(),
//       otp: Joi.string().required(),
//       oldPassword: Joi.string().required(),
//       newPassword: Joi.string().required(),
//       confirmPassword: Joi.string().required(), 
//     })
//   },
//   forgotPassword: {
//     body: Joi.object({
//       email: Joi.string().required(),
//       otp: Joi.string().required(),
//       newPassword: Joi.string().required(),
//       confirmPassword: Joi.string().required(),
//     })
//   }
// };
