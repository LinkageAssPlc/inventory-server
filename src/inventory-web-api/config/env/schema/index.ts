import { Joi } from 'celebrate';

// define validation for all the env vars
export const schema = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(4500),
  SALTWORKER: Joi.number().default(12),

  HOST_URL: Joi.string().required(),
  ROOT_ENTRY: Joi.string().required(),
  API_DOCS: Joi.string(),

  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),

  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  
  MONGO_HOST: Joi.string()
    .default('mongodb://localhost:27017/inventory')
    .description('Production Database host name')
    .required(),

  MONGO_TEST: Joi.string()
    .default('mongodb://localhost/perday')
    .description('Test Database host name')
    .required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.string().required(),
  SERVER_PUBLIC_TOKEN: Joi.string().required(),

  SENDGRID_API_KEY: Joi.string().required(),
  QUICK_TWEETS_MAIL: Joi.string().required(),
  MAILDATASENDER: Joi.string().required(),
  MAILDATARECIPIENT: Joi.string().required(),
  MAILDATASUBJECT: Joi.string().required(),
  MAILDATAMESSAGEBODY: Joi.string().required(),
  MAILDATAINFO: Joi.string().required(),
};
