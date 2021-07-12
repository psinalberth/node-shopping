import path from 'path';
import rootDir from '../utils/path';
import ProductRepository from '../repository/product.repository';

export default class CartController {

  static addProduct(req, res, next) {
    console.log(req.params)
    res.redirect('/products');
  }
}