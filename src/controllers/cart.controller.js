import path from "path";
import rootDir from "../utils/path";
import CartRepository from "../repository/cart.repository";
import OrderRepository from "../repository/order.repository";
import ProductRepository from "../repository/product.repository";

export default class CartController {
  static getCart(req, res, next) {
    CartRepository.getProducts()
      .then((products) =>
        res.render(path.join(rootDir, "views", "shop", "cart.pug"), {
          products,
          path: "/cart",
        })
      )
      .catch((err) => console.log(err));
  }

  static addProduct(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.findByPk(productId)
      .then((product) => {
        return req.user.addtoCart(product);
      })
      .then(() => res.redirect("/cart"))
      .catch((err) => console.log(err));
  }

  static removeProduct(req, res, next) {
    let productId = req.params.productId;
    CartRepository.removeProduct(productId)
      .then(() => res.redirect("/cart"))
      .catch((err) => console.log(err));
  }

  static clean(req, res, next) {
    let userLoggedInId = 1;
    CartRepository.clean(userLoggedInId)
      .then(() => res.redirect("/cart"))
      .catch((err) => console.log(err));
  }

  static order(req, res, next) {
    let userLoggedInId = 1;
    req.user
      .addOrder()
      .then(() => res.redirect("/orders"))
      .catch((err) => console.log(err));
  }
}
