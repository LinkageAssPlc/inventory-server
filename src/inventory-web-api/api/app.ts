import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import { config, error } from '../config';

// express application
const app = express();

// disable for performance
app.disable('etag').disable('x-powered-by');

// secure apps by setting various HTTP headers
app.use(
  helmet({ dnsPrefetchControl: false, frameguard: false, ieNoOpen: false })
);

// compress request data for easy transport
app.use(compress());
app.use(methodOverride());

// allow cross origin requests
// configure to only allow requests from certain origins
// app.use(cors({ credentials: true, origin: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
  ? process.env.FRONTEND_PROD_URL
  : process.env.FRONTEND_DEV_URL,
  methods: process.env.ALLOWED_METHODS?.split(','),
  allowedHeaders: process.env.ALLOWED_HEADERS?.split(','),
  credentials: true,
  maxAge: 86400 //24-hour preflight cache,
}))
app.use(cookieParser());

// parse body params and attach them to res.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable detailed API logging in dev env
if (config.env === 'development') app.use(logger('dev'));

// all routes are marked as private routes within the app
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
