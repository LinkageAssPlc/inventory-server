import os from 'os';
import http from 'http';
import { Application } from 'express';

import { config } from '../env';

export const Server = (
  ExpressApplication: Application,
  port: string | number,
  path: string,
) => {
  const server = new http.Server(ExpressApplication);
  return {
    'test' : () => {
      return server.listen(
        port,
        () => {
          console.info(
            `Mock Environment up and running @: ${os.hostname()} on port: ${port}`
          );
        }
      );
    },
    'live' : () => {
      return server.listen(
        port, 
        () => {
          console.log(`🚀 Server ready and listening at (${config.env}) ==> http://localhost:${port}${path}`); // eslint-disable-line no-console
        }
      );
    },
  };
};
