import AuthValidation from "../validations";
import { AuthController } from "../controllers";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { baseRouter } from "../../../inventory-shared/api/baseRouter";
import { baseValidation } from "../../../inventory-shared/api/baseValidation";

const {POST, router} = baseRouter();

POST('/sign-up', [baseValidation(AuthValidation.signUp), AuthController.signUp]);
POST('/sign-in', [baseValidation(AuthValidation.signIn), AuthController.signIn]);
POST('/send-otp', [baseValidation(AuthValidation.sendOTP), AuthController.sendOTP]);
POST('/verify-otp', [baseValidation(AuthValidation.verifyOTP), AuthController.verifyOTP]);
POST('/reset-password', [
  baseValidation(AuthValidation.resetPassword), 
  AuthMiddleware.baseAuthToken, 
  AuthMiddleware.IsUserMiddleware, 
  AuthController.resetPassword
]);
POST('/forgot-password', [baseValidation(AuthValidation.forgotPassword), AuthController.forgotPassword])

export default router;
