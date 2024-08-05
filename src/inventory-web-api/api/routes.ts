/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from 'express';

 import authRoute from '../../inventory-auth/api/routes';
 import categoryRoute from '../../inventory-category/api/routes';
 import brandRoute from '../../inventory-brand/api/routes';
 import productRoute from '../../inventory-product/api/routes';
 import newStockRoute from '../../inventory-new-stock/api/routes';




const router = Router();
 
/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
  res.send({ check: 'Inventory server is live!. 📦 🧧 💪🏾' }),
);


router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/brand', brandRoute);
router.use('/product', productRoute);
router.use('/new-stock', newStockRoute);

 
export default router;
