import CategoryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { CategoryController } from "../controllers/category";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, GET, PUT, DELETE, router} = baseRouter();

POST("/", [baseValidation(CategoryValidation.category), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, CategoryController.addCategory]);
GET("/", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, CategoryController.getCategories]);
PUT("/:categoryID", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, CategoryController.editCategory]);
DELETE("/:categoryID", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, CategoryController.deleteCategory]);

export default router;
