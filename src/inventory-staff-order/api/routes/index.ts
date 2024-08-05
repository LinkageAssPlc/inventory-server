import ProductValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { NewStockController } from "../controllers/new-stock";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/add-new-stock", [baseValidation(ProductValidation.newStock), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, NewStockController.newStock]);

export default router;
