import Product from "../models/product";
export default class ProductRepository {
  static findAll() {
    return Product.findAll();
  }

  static findByPk(productId) {
    return Product.findByPk(productId);
  }

  static save(product) {
    return Product.create(product, {
      fields: ["title", "description", "imageUrl", "price"],
    });
  }

  static update(productId, product) {
    return Product.findByPk(productId)
      .then(() => Product.update(product))
      .catch((error) => console.log(error));
  }

  static deleteByPk(productId) {
    return Product.findByPk(productId)
      .then(() => Product.deleteByPk(productId))
      .catch((error) => console.log(error));
  }

  static activate(productId) {}

  static deactivate(productId) {}
}
