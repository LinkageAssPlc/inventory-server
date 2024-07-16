
export interface IMailInfo {
  from?: string;
  to: string;
  subject: string;
  text: string;
  additionalInfo?: string;
  templateData?: object;
  templateId?: string;
}
