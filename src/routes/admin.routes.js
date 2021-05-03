import { Router } from 'express';
import path from 'path';
import rootDir from '../utils/path';
import ProductRepository from '../repository/product.repository';

const router = Router();

router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'index'));
});

router.get('/products', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'product'));
  ProductRepository.findByPk(12)
  .then(res => console.log(res));
});

export default router;