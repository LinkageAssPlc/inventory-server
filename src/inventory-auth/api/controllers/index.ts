import { Request } from 'express';
import httpStatus from 'http-status';

import { BaseController } from "../../../inventory-shared/api";

import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { SignInUserDTO } from '../../DTOs/SignInUserDTO';
import { SendOTPDTO, VerifyOTPDTO } from '../../DTOs/OTPDTO';
import { ResetPasswordDTO } from '../../DTOs/ResetPasswordDTO';
import { ForgotPasswordDTO } from '../../DTOs/ForgotPasswordDTO';

import { singUpService, singInService, resetPasswordService, forgotPasswordService, sendOTPService, verifyOTPService  } from '../../services';


export class AuthController {
  static signUp = BaseController(async (request: Request) => {
    const CreateUserDTO = request.body as CreateUserDTO;
    const {status, message, data} = await singUpService(CreateUserDTO);
    return {status, message, data};
  });

  static signIn = BaseController(async (request: Request) => {
    const SignInUserDTO = request.body as SignInUserDTO;
    const {status, message, data, token} = await singInService(SignInUserDTO);
    return {status, message, data, token};
  });

  static sendOTP = BaseController(async (request: Request) => {
    const SendOTPDTO = request.body as SendOTPDTO;
    const {status, message, data} = await sendOTPService(SendOTPDTO);
    return {status, message, data};
  });

  static verifyOTP = BaseController(async (request: Request) => {
    const VerifyOTPDTO = request.body as VerifyOTPDTO;
    const {status, message, data} = await verifyOTPService(VerifyOTPDTO);
    return {status, message, data};
  });

  static resetPassword = BaseController(async (request: Request) => {
    const ResetPasswordDTO = request.body as ResetPasswordDTO;
    if (ResetPasswordDTO.email !== request.token.email) { ///ask ???
      return {status: httpStatus.BAD_REQUEST, message: `cannot reset another user's password`, data: null}
    };
    ResetPasswordDTO.userID = String(request.token._id);
    const {status, message, data} = await resetPasswordService(ResetPasswordDTO);
    return {status, message, data};
  });

  static forgotPassword = BaseController(async (request: Request) => {
    const ForgotPasswordDTO = request.body as ForgotPasswordDTO;
    const {status, message, data} = await forgotPasswordService(ForgotPasswordDTO);
    return {status, message, data};
  })   
}
