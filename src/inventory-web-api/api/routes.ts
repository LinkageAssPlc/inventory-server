/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from 'express';

 import authRoute from '../../inventory-auth/api/routes';
 import categoryRoute from '../../inventory-category/api/routes';
 import subCategoryRoute from '../../inventory-subcategory/api/routes';
 import brandRoute from '../../inventory-brand/api/routes';
 import productRoute from '../../inventory-product/api/routes';
 import itemsListRoute from '../../inventory-items-list/api/routes';
 import staffOrderRoute from '../../inventory-staff-order/api/routes';




const router = Router();
 
/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
  res.send({ check: 'Inventory server is live!. 📦 🧧 💪🏾' }),
);


router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/subcategory', subCategoryRoute);
router.use('/brand', brandRoute);
router.use('/product', productRoute);
router.use('/items-list', itemsListRoute);
router.use('/staff-order', staffOrderRoute);

 
export default router;
