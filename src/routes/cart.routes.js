import { Router } from 'express';
import CartController from '../controllers/cart.controller';

const routes = Router();

routes.post('/:productId/add-product', CartController.addProduct);

export default routes;