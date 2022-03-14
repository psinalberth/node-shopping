import express from "express";
import path from "path";
import routes from "./routes";
import { mongoConnect } from "./utils/database";
import rootDir from "./utils/path";
import User from "./models/user";

const app = express();
const DB_FORCE_SYNC = process.env.DB_FORCE_SYNC | 0;
const PORT = process.env.PORT | 3000;

// Template engine configuration

app.set("view engine", "pug");

// Body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static resources

app.use(express.static(path.join(rootDir, "public")));
app.use("/libraries", express.static(path.join(rootDir, "..", "node_modules")));
app.use("/libraries", express.static(path.join(rootDir, "public")));

// User middleware

app.use((req, res, next) => {
  User.findByPk("621e8e518547c4510029fdb4")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

// Routes

app.use(routes);

// Database synchronization

mongoConnect(() => {
  app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
});

export default app;
