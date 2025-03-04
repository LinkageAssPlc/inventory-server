// import { Joi } from 'celebrate';
import { z } from "zod";

// export const signUpSchema = z.object({
//   body: z.object({
//     firstname: z.string().nonempty(),
//     lastname: z.string().nonempty(),
//     department: z.string().nonempty(),
//     email: z.string().email().nonempty(),
//     password: z.string().min(8).nonempty(),
//     confirmPassword: z.string().min(8).nonempty(),
//   }),
// });

// export const signInSchema = z.object({
//   email: z.string(),
//   password: z.string().min(8),
// });

// Reusable schemas
const emailSchema = z.string().email("Invalid email format").transform(val => val.trim().toLowerCase());
const passwordSchema = z.string()
  .min(9, "Password must be at least 9 characters")
  .regex(/[A-Z]/, "Password contain at least one uppercase letter")
  .regex(/[a-z]/, "Password contain at least one lowercase letter")
  .regex(/[0-9]/, "Password contain at least one number")
  .transform(val => val.trim());

// const otpSchema = z.string()
//   .length(6, "OTP must be 6 digits")
//   .regex(/^\d+$/, "OTP must contain only numbers");

export default {
  // signUp: {
  //   body: z.object({
  //     firstname: z.string().min(2).max(20),
  //     lastname: z.string().min(2).max(20),
  //     department: z.string(),
  //     email: z.string().email(),
  //     password: z.string().min(9),
  //     confirmPassword: z.string().min(9),
  //   }),
  // },
  signUp: {
    body: z.object({
      firstname: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name cannot exceed 20 characters")
        .transform(val => val.trim()),
      lastname: z.string()
        .max(20, "Last name cannot exceed 20 characters")
        .transform(val => val.trim()),
      department: z.string().min(1, "Department is required"),
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema
    }).strict()
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    })
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
