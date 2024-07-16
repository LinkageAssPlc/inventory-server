import { User } from '../../inventory-entities';
import { sendMailByClient } from '../../inventory-messaging/mail';
const sendMail = sendMailByClient();

export const sendPasswordResetMail = async (user: User) => {
  await sendMail({
    to: user.email,
    subject: `Quick Tweets Password Reset ${user.firstname} ${user.lastname}`,
    text: `Your password was recently changed. If it was not you,  please report here`,
  });
}
