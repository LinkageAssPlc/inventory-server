import ProductValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { ProductController } from "../controllers/product";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(ProductValidation.product), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, ProductController.addProduct]);

export default router;
