// import formData from 'form-data';
// import Mailgun from 'mailgun.js';

// import { IMailInfo } from './types';


// const mailgun = new Mailgun(formData);

// const { key, domain} = config.client.mailClient.mailgun,
//   mg = mailgun.client({ username: 'api', key });

// export const sendMailByMailgun = (data: IMailInfo) => {
//   const { from, to, subject, text, additionalInfo } = data;
//   const { from: sender, to: recipient, subject: _subject, text: _text, other } = config.defaults.mailInfo;
  
//   mg.messages.create(
//     domain,
//     {
//       from: from || sender,
//       to: to || recipient,
//       subject: subject || _subject,
//       text: text || _text,
//       other: additionalInfo || other,
//     }).
//     then((body: any) => {
//       console.log(`mail sent succesfully to ${ to }`);
//       console.log(body);
//     })
//     .catch((error: any) => console.error(error));;
// };
