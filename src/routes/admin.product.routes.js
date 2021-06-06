import { Router } from 'express';
import ProductAdminController from '../controllers/product.admin.controller';

const router = Router();

router.get('/', ProductAdminController.findAll);

router.get('/add-product', ProductAdminController.index);

router.post('/add-product', ProductAdminController.save);

router.get('/:productId/edit-product', ProductAdminController.findByPk);

router.post('/:productId/edit-product', ProductAdminController.update);

router.put('/:productId/activate', ProductAdminController.activate);

router.put('/:productId/deactivate', ProductAdminController.deactivate);

router.post('/:productId/delete-product', ProductAdminController.delete);

export default router;