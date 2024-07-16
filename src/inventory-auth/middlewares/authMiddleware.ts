import { UserTokenType, Role } from '../../types/user';
import { authTokenService } from './authToken.middleware';
import { headerBearerToken } from './policies.middleware';
import { accessControl } from './accessControl.middleware';


export class AuthMiddleware {
  static IsUser = (token?: UserTokenType) => accessControl(
      {Roles: [Role.USER], token});
  static IsUserMiddleware = AuthMiddleware.IsUser();

  static baseAuthToken = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: false
  });
  
  static baseAuthTokenWithExternalAccess = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: true,
    roleAccess: AuthMiddleware.IsUser
  });

  // static accountHolderAccess = authTokenService({
  //   authPolicy: headerBearerToken,
  //   allowExternalAccess: false,
  //   roleAccess: AuthMiddleware.IsAccountHolder
  // });
}
