/**
 * @param {Number} statusCode - status code of the response
 * @param {string} message - message identify the code
 * @param {{}} payload - response object
 * @param {Error} error - error message
 * @param {Token} token - jwt token
 */

import { ResponseInterface } from './types';

export default function Response(
  statusCode: number,
  message: string,
  payload: object | null = null,
  errors: object | null = null,
  token: string | null = null
): ResponseInterface {
  return {
    statusCode,
    message,
    payload,
    errors,
    token
  };
}
