import bcrypt from 'bcrypt';
import httpStatus from "http-status";


import { verifyOtp } from "../plugins";
import { UserModel } from "../../inventory-entities";
import { config } from '../../inventory-web-api/config';
import { ForgotPasswordDTO } from "../DTOs/ForgotPasswordDTO";


export const forgotPasswordService = async ({email, otp, newPassword, confirmPassword}: ForgotPasswordDTO) => {
    const user = await UserModel.findOne({email}).lean();
    if(!user) return {success: false, status: httpStatus.BAD_REQUEST, message: `User ${email} not found`, data: null};
    const otpVerification = await verifyOtp(email, otp);
    if (!otpVerification) return {success: false, status: httpStatus.BAD_REQUEST, message: 'otp expired or incorrect', data: null};
    
    //??? 
        
    if (newPassword !== confirmPassword){
        return {success: false, status: httpStatus.BAD_REQUEST, message: `passwords don't match`, data: null};
      }

    const hashedPassword = await bcrypt.hash(newPassword, config.saltWorker);
    await UserModel.findByIdAndUpdate(user._id, {password: hashedPassword});
    return {success: true, status: httpStatus.OK, message: `passwords changed successfully`, data: user};

}