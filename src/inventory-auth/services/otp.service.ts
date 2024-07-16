import httpStatus from 'http-status';

import { UserModel } from '../../inventory-entities';
import { issueOtp, verifyOtp } from '../plugins';
import { SendOTPDTO, VerifyOTPDTO } from '../DTOs/OTPDTO';
import {sendOtpMail} from '../../inventory-shared/mail/sendOTPMail';


export const sendOTPService = async ({email}: SendOTPDTO) => {
  const user = await UserModel.findOne({email});
  if (!user) return {success: false, status: httpStatus.BAD_REQUEST, message: `user with ${email} not found`, data: {}};
  const {emailOtp: otp, timeLeft} = await issueOtp(email);
  await sendOtpMail({user, otp, timeLeft});
  return { status: httpStatus.OK, success: true, message: `otp sent to email ${email}`, data: {}};
};

export const verifyOTPService = async ({email, otp}: VerifyOTPDTO) => {
  const user = await UserModel.findOne({email});
  if (!user) return {success: false, status: httpStatus.BAD_REQUEST, message: `user with ${email} not found`, data: {}};
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification) return {success: false, status: httpStatus.BAD_REQUEST, message: `otp expired or incorrect`, data: {}};
  return { status: httpStatus.OK, success: true, message: `otp verified`, data: {}};
};
