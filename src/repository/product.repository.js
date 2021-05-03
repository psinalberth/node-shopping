import Product from '../models/product';

export default class ProductRepository {

  static findAll() {
    return Product.findAll();
  }

  static findByPk(productId) {
    return Product.findByPk(productId);
  }

  static save(product) {
    return Product.create(product, {
      fields: [ 'title', 'description', 'imageUrl', 'price' ]
    })
  }

  static update(productId, product) {
    return Product.findByPk(productId)
      .then(savedProduct => {
        Object.keys(product).forEach(key => {
          savedProduct[key] = product[key];
        });
        return savedProduct.save();
      })
      .catch(error => console.log(error));
  }

  static deleteByPk(productId) {
    return Product.findByPk(productId)
      .then(product => {
        product.destroy();
      })
      .catch(error => console.log(error));
    }
};