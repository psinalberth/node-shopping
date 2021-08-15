import path from 'path';
import rootDir from '../utils/path';
import ProductRepository from '../repository/product.repository';
export default class ProductController {

  static findAll(req, res, next) {
    ProductRepository.findAll()
    .then(products => {
      res.render(path.join(rootDir, 'views', 'shop', 'products.pug'), {
        products,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  }

  static findByPk(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.findByPk(productId)
      .then(product => {
        if (product) {
          res.render(path.join(rootDir, 'views', 'shop', 'product.pug'), {
            product,
            path: '/products'
          });
        } else {
          res.status(404).render(path.join(rootDir, 'views', 'error', '404.pug'));
        }
      })
      .catch(err => console.log(err));
  }
};