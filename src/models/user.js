import { ObjectId } from "mongodb";
import { getDb as db } from "../utils/database";

export default class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  static users() {
    return db().collection("users");
  }

  static save() {
    return this.users()
      .insertOne(this)
      .then((user) => user)
      .catch((err) => console.log(err));
  }

  addtoCart(product) {
    let newQuantity = 1;

    const productIndex =
      this.cart !== undefined
        ? this.cart.items.findIndex((p) => {
            return p.productId.toString() === product.id.toString();
          })
        : -1;
    let cartItems = this.cart !== undefined ? [...this.cart.items] : [];

    if (productIndex >= 0) {
      newQuantity = this.cart.items[productIndex].quantity + 1;
      cartItems[productIndex].quantity = newQuantity;
    } else {
      cartItems.push({ productId: new ObjectId(product.id), quantity: 1 });
    }

    const updatedCart = {
      items: cartItems,
    };

    return db()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  removeFromCart(productId) {
    const updatedCart = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    return db()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  getOrders() {
    return db()
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  getOrder(orderId) {
    return db()
      .collection("orders")
      .findOne({
        "user._id": new ObjectId(this._id),
        _id: new ObjectId(orderId),
      });
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db().collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db()
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getCart() {
    const productIds = this.cart.items.map((item) => {
      return item.productId;
    });

    return db()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  static findByPk(userId) {
    return this.users()
      .findOne({ _id: new ObjectId(userId) })
      .catch((err) => console.log(err));
  }
}
