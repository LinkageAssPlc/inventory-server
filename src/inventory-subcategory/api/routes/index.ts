import CategoryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { SubCategoryController } from "../controllers/subCategory";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(CategoryValidation.subCategory), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, SubCategoryController.addSubCategory]);

export default router;
