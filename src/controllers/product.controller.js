import path from 'path';
import rootDir from '../utils/path';
import ProductRepository from '../repository/product.repository';

export default class ProductController {

  static index(req, res, next) {
    res.render(path.join(rootDir, 'views', 'shop', 'product.pug'), {
      editing: false
    });
  }

  static findAll(req, res, next) {
    ProductRepository.findAll()
    .then(products => {
      res.render(path.join(rootDir, 'views', 'shop', 'products.pug'), {
        products
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
            editing: true,
            product
          });
        } else {
          res.status(404).render(path.join(rootDir, 'views', 'error', '404.pug'));
        }
      })
      .catch(err => console.log(err));
  }

  static save(req, res, next) {
    const body = req.body;
    ProductRepository.save(body)
      .then(() => res.redirect('/products'))
      .catch(err => console.log(err));
  }

  static update(req, res, next) {
    const productId = req.body.productId;
    const body = req.body;
    ProductRepository.update(productId, body)
      .then(() => res.redirect('/products'))
      .catch(err => console.log(err));
  }

  static remove(req, res, next) {
    const productId = req.params.productId;
    ProductRepository.remove(productId)
      .then(() => {

      })
      .catch(err => console.log(err));
  }
};