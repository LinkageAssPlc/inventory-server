import { z } from 'zod';

// Define validation for all the env vars
export const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.number().default(4500),
  SALTWORKER: z.number().default(12),

  HOST_URL: z.string().nonempty("HOST_URL is required"),
  ROOT_ENTRY: z.string().nonempty("ROOT_ENTRY is required"),
  API_DOCS: z.string().optional(),

  CLOUDINARY_API_KEY: z.string().nonempty("CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().nonempty("CLOUDINARY_API_SECRET is required"),
  CLOUDINARY_CLOUD_NAME: z.string().nonempty("CLOUDINARY_CLOUD_NAME is required"),

  // MONGOOSE_DEBUG: z.boolean().default(false).refine((val, ctx) => {
  //   const nodeEnv = ctx.parent.NODE_ENV;
  //   return (nodeEnv === 'development' && val === true) || (nodeEnv !== 'development' && val === false);
  // }, {
  //   message: "MONGOOSE_DEBUG must be true in development and false otherwise",
  // }),

  MONGO_HOST: z.string()
    .nonempty("MONGO_HOST is required")
    .default('mongodb://localhost:27017/inventory')
    .describe('Production Database host name'),

  MONGO_TEST: z.string()
    .nonempty("MONGO_TEST is required")
    .default('mongodb://localhost/perday')
    .describe('Test Database host name'),

  JWT_SECRET: z.string().nonempty("JWT_SECRET is required"),
  JWT_EXPIRY: z.string().nonempty("JWT_EXPIRY is required"),
  SERVER_PUBLIC_TOKEN: z.string().nonempty("SERVER_PUBLIC_TOKEN is required"),

  SENDGRID_API_KEY: z.string().nonempty("SENDGRID_API_KEY is required"),
  QUICK_TWEETS_MAIL: z.string().nonempty("QUICK_TWEETS_MAIL is required"),
  MAILDATASENDER: z.string().nonempty("MAILDATASENDER is required"),
  MAILDATARECIPIENT: z.string().nonempty("MAILDATARECIPIENT is required"),
  MAILDATASUBJECT: z.string().nonempty("MAILDATASUBJECT is required"),
  MAILDATAMESSAGEBODY: z.string().nonempty("MAILDATAMESSAGEBODY is required"),
  MAILDATAINFO: z.string().nonempty("MAILDATAINFO is required"),
});





// import { Joi } from 'celebrate';

// // define validation for all the env vars
// export const schema = {
//   NODE_ENV: Joi.string()
//     .valid('development', 'production', 'test')
//     .default('development'),

//   PORT: Joi.number().default(4500),
//   SALTWORKER: Joi.number().default(12),

//   HOST_URL: Joi.string().required(),
//   ROOT_ENTRY: Joi.string().required(),
//   API_DOCS: Joi.string(),

//   CLOUDINARY_API_KEY: Joi.string().required(),
//   CLOUDINARY_API_SECRET: Joi.string().required(),
//   CLOUDINARY_CLOUD_NAME: Joi.string().required(),

//   MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
//     is: Joi.string().equal('development'),
//     then: Joi.boolean().default(true),
//     otherwise: Joi.boolean().default(false),
//   }),
  
//   MONGO_HOST: Joi.string()
//     .default('mongodb://localhost:27017/inventory')
//     .description('Production Database host name')
//     .required(),

//   MONGO_TEST: Joi.string()
//     .default('mongodb://localhost/perday')
//     .description('Test Database host name')
//     .required(),

//   JWT_SECRET: Joi.string().required(),
//   JWT_EXPIRY: Joi.string().required(),
//   SERVER_PUBLIC_TOKEN: Joi.string().required(),

//   SENDGRID_API_KEY: Joi.string().required(),
//   QUICK_TWEETS_MAIL: Joi.string().required(),
//   MAILDATASENDER: Joi.string().required(),
//   MAILDATARECIPIENT: Joi.string().required(),
//   MAILDATASUBJECT: Joi.string().required(),
//   MAILDATAMESSAGEBODY: Joi.string().required(),
//   MAILDATAINFO: Joi.string().required(),
// };