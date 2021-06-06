import { Router } from 'express';
import path from 'path';
import rootDir from '../utils/path';
import adminProductRouter from './admin.product.routes';
import shopRouter from './shop.routes';

const routes = Router();

routes.use('/products', shopRouter);

routes.get('/admin', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'index.pug'));
});

routes.use('/admin/products', adminProductRouter);

export default routes;