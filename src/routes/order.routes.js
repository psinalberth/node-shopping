import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

router.get('/', OrderController.findAll);

router.get('/:orderId', OrderController.findByPk);

export default router;