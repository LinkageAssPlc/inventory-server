import bcrypt from 'bcrypt';
import httpStatus from "http-status";

import { verifyOtp } from '../plugins';
import { UserModel } from '../../inventory-entities';
import { config } from '../../inventory-web-api/config';
import { ResetPasswordDTO } from "../DTOs/ResetPasswordDTO";


export const resetPasswordService = async ({ email, userID, otp, oldPassword, newPassword, confirmPassword }: ResetPasswordDTO) => {
  const user = await UserModel.findById(userID);
  const otpVerification = await verifyOtp(email, otp);
  if (!otpVerification) return {success: false, status: httpStatus.BAD_REQUEST, message: `otp expired or incorrect`, data: {}};
  if (!user) return {success: false, status: httpStatus.BAD_REQUEST, message: `user ${userID} not found`};

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    return {success: false, status: httpStatus.BAD_REQUEST, message: 'old password is incorrect', data: null};
  }

  if (newPassword !== confirmPassword){
    return {success: false, status: httpStatus.BAD_REQUEST, message: `passwords don't match`, data: null};
  }

  const hashedPassword = await bcrypt.hash(newPassword, config.saltWorker);
  await UserModel.findByIdAndUpdate(user._id, {password: hashedPassword});
  return {success: true, status: httpStatus.OK, message: `passwords changed successfully`, data: user};
};
