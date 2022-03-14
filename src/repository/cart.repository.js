import UserRepository from "./user.repository";
import ProductRepository from "./product.repository";
import User from "../models/user";

export default class CartRepository {
  static save(cart) {}

  static getProducts() {
    return UserRepository.findByPk("621e8e518547c4510029fdb4")
      .then((user) => {
        return new User(user.name, user.email, user.cart, user._id);
      })
      .then((user) => user.getCart())
      .catch((err) => console.log(err));
  }

  static addProduct(productId) {
    let currentCart;
    let userLoggedIn;
    let newQuantity = 1;

    return UserRepository.findByPk(1)
      .then((user) => {
        userLoggedIn = user;
        return user.getCart();
      })
      .then((cart) => {
        if (!cart) {
          cart = userLoggedIn.createCart();
        }

        currentCart = cart;
        return currentCart.getProducts({ where: { id: productId } });
      })
      .then((products) => {
        let product;
        if (products.length > 0) {
          product = products[0];
          newQuantity = product.CartItem.quantity + 1;
          return product;
        }

        return ProductRepository.findByPk(productId);
      })
      .then((product) => {
        return currentCart.addProduct(product, {
          through: {
            quantity: newQuantity,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  static removeProduct(productId) {
    let userLoggedIn;

    return UserRepository.findByPk("621e8e518547c4510029fdb4")
      .then((user) => {
        return new User(user.name, user.email, user.cart, user._id);
      })
      .then((user) => {
        return user.removeFromCart(productId);
      })
      .then((user) => user.getCart())
      .catch((err) => console.log(err));
  }

  static clean(userLoggedInId) {
    return UserRepository.findByPk(userLoggedInId)
      .then((user) => user.getCart())
      .then((cart) => cart.setProducts([]))
      .catch((err) => console.log(err));
  }
}
