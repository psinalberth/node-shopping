import { ObjectId } from "mongodb";
import { getDb as db } from "../utils/database";
export default class Product {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.imageUrl = product.imageUrl;
    this.id = product._id;
    this.userId = product.userId;
  }

  static products() {
    return db().collection("products");
  }

  static create(product) {
    return this.products()
      .insertOne(product)
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static findAll() {
    return this.products()
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => console.log(err));
  }

  static findByPk(productId) {
    return this.products()
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => new Product(product))
      .catch((err) => console.log(err));
  }

  static update(product) {
    return this.products()
      .updateOne({ _id: new ObjectId(product.productId) }, { $set: product })
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static deleteByPk(productId) {
    return this.products()
      .deleteOne({ _id: new ObjectId(productId) })
      .then((product) => product)
      .catch((err) => console.log(err));
  }
}
