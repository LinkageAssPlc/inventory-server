import BrandValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { BrandController } from "../controllers/brand";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, GET, PUT, DELETE, router} = baseRouter();

POST("/", [baseValidation(BrandValidation.brand), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, BrandController.addBrand]);
GET("/", [AuthMiddleware.baseAuthToken, BrandController.getBrands]);
PUT("/:brandID", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, BrandController.editBrand]);
DELETE("/:brandID", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, BrandController.deleteBrand]);
export default router;
