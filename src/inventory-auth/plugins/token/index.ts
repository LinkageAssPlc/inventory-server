import jwt from 'jsonwebtoken';

import { config } from '../../../inventory-web-api/config';
import { UserTokenType } from '../../../types/user';

export const issueToken = (payload: UserTokenType): Promise<string> => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      config.token.jwtSecret,
      { expiresIn: config.token.jwtExpirationInterval },
      (error, decoded) => {
        if (error) return reject(error);
        // match decoded parameter argument conflict
        return resolve(decoded as string | Promise<string>);
      },
    ),
  );
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.token.jwtSecret, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    }),
  );
};
