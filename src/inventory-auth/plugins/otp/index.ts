import random from 'random';

import { redisMongo } from '../../../inventory-storage';
import { toMinutes } from '../../../inventory-shared/time';

export const issueOtp = async (
  email: string,
  expirationTime=600,
  manualOtp?: number,
) => {
  const otp = manualOtp || random.int(100000, 1000000);
  await redisMongo.set(email, `${otp}`, expirationTime);
  return {
    emailOtp: otp.toString(),
    timeLeft: toMinutes(expirationTime),
  };
};

export const verifyOtp = async (
  email: string,
  otp: string,
  keepAlive = false
): Promise<boolean> => {
  const emailOtp = await redisMongo.get(email);
  // To prevent the otp from being used twice, reset the otp.
  if (emailOtp !== otp) return false;
  if (!keepAlive) await issueOtp(email);
  return true;
};
