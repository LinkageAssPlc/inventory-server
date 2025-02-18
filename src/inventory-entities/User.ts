import { Role } from '../types/user';
import { Schema, Document, model } from 'mongoose';

import { ModelNames } from './models.names';



export class User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  department: string
  role: Role;
  profile_photo: string;
}


const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      minlength: 2,
      maxlength: 25,
      trim: true,
      lowercase: false,
      required: true
    },
    lastname: {
      type: String,
      minlength: 2,
      maxlength: 25,
      trim: true,
      lowercase: false,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    department: {
      type: String,
      required: true
    },
    role: {
      type: String,
      trim: true,
      lowercase: true,
      enum: [Role.USER],
      default: Role.USER
    },
    profile_photo: {
      type: String
    }
  },
  { 
    timestamps: true
  }
)

export const UserModel = model<User>(ModelNames.USER, UserSchema);

