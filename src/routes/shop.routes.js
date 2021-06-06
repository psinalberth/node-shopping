import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

router.get('/', ProductController.findAll);

router.get('/add-product', ProductController.index);

router.post('/add-product', ProductController.save);

router.get('/:productId', ProductController.findByPk);

router.post('/edit-product', ProductController.update);

export default router;