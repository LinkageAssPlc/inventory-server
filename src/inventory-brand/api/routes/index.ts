import BrandValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { BrandController } from "../controllers/brand";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, GET, router} = baseRouter();

POST("/", [baseValidation(BrandValidation.brand), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, BrandController.addBrand]);
GET("/", [AuthMiddleware.baseAuthToken, BrandController.getBrands]);

export default router;
