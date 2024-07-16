
export type ConfigTypes = {
  env: string;
  port: number;
  hostUrl: string;
  rootEntry: string;
  saltWorker: number;
  apiDocs: string;
  cloudinary: ICloudinary;
  mongo: {
    mongooseDebug: boolean;
    mongoUri: string;
    mongoTestUri: string;
  };
  token: {
    jwtSecret: string;
    jwtExpirationInterval: string;
    serverPublicToken: string;
  },
  mail: IMail;
};

interface ICloudinary {
  cloud_name: string;
  api_key: string;
  api_secret: string;
};

interface IMail {
  quickTweetsMail: string;
  from : string;
  to : string;
  subject : string;
  text : string;
  other : string;
  sendgrid: ISendgrid;
}

interface IMailgun {
  key : string;
  domain : string;
}

interface ISendgrid {
  key: string,
}

export interface ErrorResponseInterface {
  message: string;
  errors: string;
  stack: string | undefined;
  statusCode: number;
  payload?: object | null;
}

export interface ExpressErrorInterface extends Error {
  errors: string;
  status: number;
};
