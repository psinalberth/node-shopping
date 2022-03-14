import path from "path";
import rootDir from "../utils/path";
import OrderRepository from "../repository/order.repository";

export default class OrderController {
  static findAll(req, res, next) {
    req.user
      .getOrders()
      .then((orders) =>
        res.render(path.join(rootDir, "views", "order", "orders.pug"), {
          orders,
          path: "/orders",
        })
      )
      .catch((err) => console.log(err));
  }

  static findByPk(req, res, next) {
    const orderId = req.params.orderId;
    req.user
      .getOrder(orderId)
      .then((order) =>
        res.render(path.join(rootDir, "views", "order", "order.pug"), {
          order,
          path: "/orders",
        })
      )
      .catch((err) => console.log(err));
  }
}
