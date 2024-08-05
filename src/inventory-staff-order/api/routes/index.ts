import ProductValidation from "../validations";
import { baseRouter, baseValidation } from "../../../inventory-shared/api";

import { StaffOrderController } from "../controllers/staff-order";
import { AuthMiddleware } from "../../../inventory-auth/middlewares/authMiddleware";

const {POST, router} = baseRouter();

POST("/", [baseValidation(ProductValidation.staffOrder), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, StaffOrderController.staffOrder]);

export default router;
