import { Joi } from 'celebrate';


export default {
  signUp: {
    body: Joi.object({
      firstname: Joi.string().max(20).required(),
      lastname: Joi.string().max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
      department: Joi.string().required(),
    })
  },
  signIn: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
    })
  },
  sendOTP: {
    body: Joi.object({
      email: Joi.string().required(),
    }) 
  },
  verifyOTP: {
    body: Joi.object({
      email: Joi.string().required(),
      otp: Joi.string().required()
    })
  },
  resetPassword: {
    body: Joi.object({
      email: Joi.string().required(),
      otp: Joi.string().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
      confirmPassword: Joi.string().required(), 
    })
  },
  forgotPassword: {
    body: Joi.object({
      email: Joi.string().required(),
      otp: Joi.string().required(),
      newPassword: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    })
  }
};
