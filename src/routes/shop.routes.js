import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

router.get('/', ProductController.findAll);

router.get('/:productId', ProductController.findByPk);

export default router;