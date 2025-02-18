// import { Joi } from 'celebrate';
import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    department: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(8).nonempty(),
    confirmPassword: z.string().min(8).nonempty(),
  }),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export default {
  signUp: {
    body: z.object({
      // firstname: z.string().min(2).max(20).messages({
      //   "any.required": "Firstname is compulsory!",
      // }),
      firstname: z.string().min(2).max(20),
      lastname: z.string().max(20),
      department: z.string(),
      email: z.string().email(),
      password: z.string().min(9),
      confirmPassword: z.string().min(9),
    }),
  },
  signIn: {
    body: z.object({
      email: z.string(),
      password: z.string().min(8),
    }),
  },
  sendOTP: {
    body: z.object({
      email: z.string(),
    }),
  },
  verifyOTP: {
    body: z.object({
      email: z.string(),
      otp: z.string(),
    }),
  },
  resetPassword: {
    body: z.object({
      email: z.string(),
      otp: z.string(),
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    }),
  },
  forgotPassword: {
    body: z.object({
      email: z.string(),
      otp: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    }),
  },
};
