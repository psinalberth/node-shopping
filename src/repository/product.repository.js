import Product from "../models/product";
export default class ProductRepository {
  static findAll() {
    return Product.find();
  }

  static findByPk(productId) {
    return Product.findById(productId);
  }

  static save(newProduct) {
    const product = new Product({
      title: newProduct.title,
      description: newProduct.description,
      imageUrl: newProduct.imageUrl,
      price: newProduct.price,
    });
    return product.save();
  }

  static update(productId, product) {
    return Product.findById(productId)
      .then((savedProduct) => {
        savedProduct.title = product.title;
        savedProduct.description = product.description;
        savedProduct.imageUrl = product.imageUrl;
        savedProduct.price = product.price;

        return savedProduct.save();
      })
      .catch((error) => console.log(error));
  }

  static deleteByPk(productId) {
    return Product.findByIdAndRemove(productId).catch((error) =>
      console.log(error)
    );
  }

  static activate(productId) {}

  static deactivate(productId) {}
}
