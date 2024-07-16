import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import { Role, UserTokenType } from '../../types/user';
import sendResponse from '../../inventory-shared/response';
// import { getUser, isAccountDisabled } from './screener';

type multRoles = Role[];
type AccessControlType = {Roles: multRoles, token? : UserTokenType};
export const accessControl = ({Roles, token}: AccessControlType) => {
  return async function(request: Request, response: Response, next: NextFunction) {
    const role = token? token.role : request.token.role;

    const accessGranted = Roles.some(userRole => role === userRole);
    if (!accessGranted) {
      return response.json(
        sendResponse(
          httpStatus.UNAUTHORIZED,
          'You are not Authorized to perform this operation!',
          null,
          { error: 'Invalid credentials' },
        ),
      );
    }

    // try {      
    //   const user = await getUser({ userID: (token ? token._id : request.token._id), role});
    //   const disabledUser = await isAccountDisabled({userData: user});
    //   if (disabledUser){
    //     return response.status(httpStatus.UNAUTHORIZED).json(
    //       sendResponse(httpStatus.UNAUTHORIZED, 'user account disabled', null, {
    //         error: 'user account disabled',
    //       }),
    //     );
    //   }
    // } catch (error: any){
    //   console.error(error.message);
    // }

    return next();
  };
};
