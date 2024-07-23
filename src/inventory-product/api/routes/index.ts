import ProductValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { ProductController } from "../controllers/product";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/add-product", [baseValidation(ProductValidation.product), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, ProductController.product]);

export default router;
