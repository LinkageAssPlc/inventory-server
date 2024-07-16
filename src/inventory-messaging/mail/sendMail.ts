import { IMailInfo } from './types';
import { sendMailBySendGrid } from './sendMail.sendgrid';


export const sendMailByClient = (client = 'sendgrid' as 'sendgrid') => {
  const MailClients: {
    [key in 'sendgrid'] : (data: IMailInfo) => void;
  } = {
    'sendgrid' : sendMailBySendGrid,
  };
  const Mailer = MailClients[client];
  return async (data: IMailInfo) => Mailer(data)
};
