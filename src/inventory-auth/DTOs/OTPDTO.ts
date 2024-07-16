export type SendOTPDTO = {
  email: string;
};

export type VerifyOTPDTO = {
  email: string;
  otp: string;
};

