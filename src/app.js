import express from "express";
import path from "path";
import routes from "./routes";
import rootDir from "./utils/path";
import mongoose from "mongoose";

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

// Routes

app.use(routes);

// Database synchronization

mongoose
  .connect(
    "mongodb://root:password@localhost:27019/test?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  })
  .catch((err) => console.log(err));

export default app;
