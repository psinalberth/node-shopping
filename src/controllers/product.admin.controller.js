import path from "path";
import rootDir from "../utils/path";
import ProductRepository from "../repository/product.repository";

export default class ProductAdminController {
  static index(req, res, next) {
    res.render(path.join(rootDir, "views", "admin", "product", "product.pug"), {
      editing: false,
      path: "/admin",
    });
  }

  static findAll(req, res, next) {
    ProductRepository.findAll()
      .then((products) => {
        res.render(
          path.join(rootDir, "views", "admin", "product", "products.pug"),
          {
            products,
            path: "/admin",
          }
        );
      })
      .catch((err) => console.log(err));
  }

  static findByPk(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.findByPk(productId)
      .then((product) => {
        if (product) {
          res.render(
            path.join(rootDir, "views", "admin", "product", "product.pug"),
            {
              editing: true,
              product,
              path: "/admin",
            }
          );
        } else {
          res
            .status(404)
            .render(path.join(rootDir, "views", "error", "404.pug"));
        }
      })
      .catch((err) => console.log(err));
  }

  static save(req, res, next) {
    const body = { ...req.body, userId: req.user._id };
    ProductRepository.save(body)
      .then(() => res.redirect("/admin/products"))
      .catch((err) => console.log(err));
  }

  static update(req, res, next) {
    const productId = req.body.productId;
    const body = req.body;
    ProductRepository.update(productId, body)
      .then(() => res.redirect("/admin/products"))
      .catch((err) => console.log(err));
  }

  static delete(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.deleteByPk(productId)
      .then(() => res.redirect("/admin/products"))
      .catch((err) => console.log(err));
  }

  static activate(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.activate(productId);
  }

  static deactivate(req, res, next) {
    let productId = req.params.productId;
    ProductRepository.deactivate(productId);
  }
}
