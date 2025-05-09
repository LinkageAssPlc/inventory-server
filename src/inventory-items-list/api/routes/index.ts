import ItemsListValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { AddNewItemsListController } from "../controllers/items-list";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(ItemsListValidation.itemsList), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AddNewItemsListController.addNewItemsList]);

export default router;
