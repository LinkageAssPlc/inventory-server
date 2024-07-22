import CategoryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { CategoryController } from "../controllers/category";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/add-category", [baseValidation(CategoryValidation.category), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, CategoryController.category]);

export default router;
