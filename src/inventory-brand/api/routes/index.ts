import CategoryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { BrandController } from "../controllers/brand";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/add-brand", [baseValidation(CategoryValidation.brand), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, BrandController.brand]);

export default router;
