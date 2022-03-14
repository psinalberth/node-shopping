import { Router } from "express";
import path from "path";
import rootDir from "../utils/path";
import adminProductRouter from "./admin.product.routes";
import shopRouter from "./shop.routes";
import cartRouter from "./cart.routes";
import orderRouter from "./order.routes";
import errorRouter from "./error.routes";

const routes = Router();

routes.get("/", (req, res, next) => {
  res.render(path.join(rootDir, "views", "index.pug"));
});

routes.use("/products", shopRouter);

routes.use("/orders", orderRouter);

routes.get("/admin", (req, res, next) => {
  res.render(path.join(rootDir, "views", "admin", "index.pug"), {
    path: "/admin",
  });
});

routes.use("/admin/products", adminProductRouter);

routes.use("/cart", cartRouter);

routes.use(errorRouter);

export default routes;
