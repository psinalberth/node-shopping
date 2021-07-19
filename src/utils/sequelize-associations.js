import Product from '../models/product';
import Cart from '../models/cart';
import CartItem from '../models/cart-item';
import User from '../models/user';
import Order from '../models/order';
import OrderItem from '../models/order-item';

export default function sync() {

  Cart.belongsToMany(Product, {
    through: CartItem,
    foreignKey: 'cart_id',
    otherKey: 'product_id'
  });

  Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'order_id',
    otherKey: 'product_id'
  });

  Product.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: 'product_id',
    otherKey: 'cart_id'
  });

  Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'product_id',
    otherKey: 'order_id'
  });

  User.hasMany(Product, {
    foreignKey: 'user_id'
  });
  
  User.hasOne(Cart, {
    foreignKey: 'user_id'
  });

  User.hasMany(Order, {
    foreignKey: 'user_id'
  });  
}