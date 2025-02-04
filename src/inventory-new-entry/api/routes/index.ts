import AddNewEntryValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { NewEntryController } from "../controllers/new-entry";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(AddNewEntryValidation.itemsList), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, NewEntryController.addNewEntry]);

export default router;
