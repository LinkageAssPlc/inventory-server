
export type ResetPasswordDTO = {
  email: string;
  otp: string
  userID: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
