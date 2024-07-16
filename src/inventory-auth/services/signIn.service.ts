import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

import { issueToken } from '../plugins';
import { UserModel } from '../../inventory-entities';
import { SignInUserDTO } from '../DTOs/SignInUserDTO';


export const singInService = async ({email, password}: SignInUserDTO) => {
  const user = await UserModel.findOne({email}).lean();
  if (!user){
    return {success: false, status: httpStatus.BAD_REQUEST, message: 'Email or Password incorrect', data: null};
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return {success: false, status: httpStatus.BAD_REQUEST, message: 'Email or Password incorrect', data: null};
  }

  const {role, _id} = user;
  const token = await issueToken({role, _id, email})

  return {success: true, status: httpStatus.OK, message: 'Login Successful', data: user, token};
};
