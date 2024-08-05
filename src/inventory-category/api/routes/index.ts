import CategoryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { CategoryController } from "../controllers/category";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(CategoryValidation.category), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, CategoryController.addCategory]);

export default router;
