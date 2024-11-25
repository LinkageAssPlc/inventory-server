import AddNewStockValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { NewStockController } from "../controllers/new-stock";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(AddNewStockValidation.newStock), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, NewStockController.addNewStock]);

export default router;
