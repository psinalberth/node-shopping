import { Router } from 'express';
import CartController from '../controllers/cart.controller';

const routes = Router();

routes.get('/', CartController.getCart);

routes.post('/:productId/add-product', CartController.addProduct);

routes.post('/:productId/remove-product', CartController.removeProduct);

routes.post('/reset', CartController.clean);

routes.post('/order', CartController.order);

export default routes;