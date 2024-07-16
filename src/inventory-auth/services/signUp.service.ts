import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

import { CreateUserDTO } from '../DTOs/CreateUserDTO';
import { UserModel } from '../../inventory-entities';
import { config } from '../../inventory-web-api/config';


export const singUpService = async ({firstname, lastname, email, password, confirmPassword, department}: CreateUserDTO) => {
  const userExist = await UserModel.findOne({email});
  
  if (userExist){
    const emailExist = userExist.email === email;

    if(emailExist) return {success: false, status: httpStatus.BAD_REQUEST, message: `user already exists`, data: null};
    
  }

  if (password !== confirmPassword){
    return {success: false, status: httpStatus.BAD_REQUEST, message: `passowords don't match`, data: null};
  }
  const hashedPassword = await bcrypt.hash(password, config.saltWorker);
  const newUser = await UserModel.create({firstname, lastname, email, password: hashedPassword, department});
  return {success: true, status: httpStatus.CREATED, message: 'new user created', data: newUser};
};
