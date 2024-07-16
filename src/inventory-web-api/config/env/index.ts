import dotEnv from 'dotenv';
import { schema } from './schema';
import { Validate } from './validators'
import { ConfigTypes } from '../types';
dotEnv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  saltWorker: envVariables.SALTWORKER,
  hostUrl: envVariables.HOST_URL,
  rootEntry: envVariables.ROOT_ENTRY,
  apiDocs: envVariables.API_DOCS,
  cloudinary: {
    cloud_name: envVariables.CLOUDINARY_CLOUD_NAME,
    api_key: envVariables.CLOUDINARY_API_KEY,
    api_secret: envVariables.CLOUDINARY_API_SECRET,
  },
  mongo: {
    mongooseDebug: envVariables.MONGOOSE_DEBUG,
    mongoUri: envVariables.MONGO_HOST || 'mongodb://localhost:27017/inventory',
    mongoTestUri: envVariables.MONGO_TEST,
  },
  token: {
    jwtSecret: envVariables.JWT_SECRET || 'secret',
    jwtExpirationInterval: envVariables.JWT_EXPIRY,
    serverPublicToken: envVariables.SERVER_PUBLIC_TOKEN || 'public_secret',
  },
  mail: {
    quickTweetsMail: envVariables.DIONMAIL,
    from : envVariables.MAILDATASENDER,
    to : envVariables.MAILDATARECIPIENT,
    subject : envVariables.MAILDATASUBJECT,
    text : envVariables.MAILDATAMESSAGEBODY,
    other : envVariables.MAILDATAINFO,
    sendgrid: {
      key: envVariables.SENDGRID_API_KEY,
    }
  },
};
