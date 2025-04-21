import BrandValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { BrandController } from "../controllers/brand";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(BrandValidation.brand), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, BrandController.addBrand]);

export default router;
