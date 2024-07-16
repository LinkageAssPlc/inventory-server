import { User } from '../../inventory-entities';
import { sendMailByClient } from '../../inventory-messaging/mail';
const sendMail = sendMailByClient();

interface IMailBody {
  user: User;
  otp: string;
  timeLeft: number;
};
export const sendOtpMail = async (mailBody: IMailBody) => {
  const {user, otp, timeLeft} = mailBody;
  await sendMail({
    to: user.email,
    subject: `Quick Tweets OTP for ${user.firstname} ${user.lastname}`,
    text:  `${timeLeft} minutes left. Please proceed with secure OTP ${otp}`,
  });
};
