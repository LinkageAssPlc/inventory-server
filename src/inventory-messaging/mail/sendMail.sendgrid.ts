import sendgridMail from '@sendgrid/mail';

import { IMailInfo } from './types';
import { config } from '../../inventory-web-api/config';


sendgridMail.setApiKey(config.mail.sendgrid.key)

export const sendMailBySendGrid = (data: IMailInfo) => {
  const { from, to, subject, text, templateData, templateId } = data;
  const { from: sender } = config.mail;
 
  const msg = { subject, text, from: from || sender,
    personalizations: [
      {
        to: [{ email: to }],
        dynamicTemplateData: templateData,
      },
    ],
    templateId,
    mailSettings: {
      sandboxMode: { enable: config.env === 'test' ? true : false },
    },
  };
  
  sendgridMail
    .send(msg)
    .catch((err: any) => console.error(err));
};
