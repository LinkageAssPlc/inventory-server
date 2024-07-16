/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from 'express';

 import authRoute from '../../inventory-auth/api/routes';



const router = Router();
 
/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
  res.send({ check: 'Quick Tweets server is live!. 📦 🧧 💪🏾' }),
);


router.use('/auth', authRoute);

 
export default router;
