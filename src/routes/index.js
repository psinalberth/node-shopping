import { Router } from 'express';
import adminRouter from './admin.routes';
import shopRouter from './shop.routes';

const routes = Router();

routes.use('/products', shopRouter);
routes.use('/admin', adminRouter);

export default routes;