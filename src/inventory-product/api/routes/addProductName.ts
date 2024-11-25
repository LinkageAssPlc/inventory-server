import { addProductNameValidation } from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { ProductController } from "../controllers/product";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(addProductNameValidation.addProductName), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, ProductController.addProductName]);

export default router;
