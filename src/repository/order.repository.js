import UserRepository from './user.repository';
import Order from '../models/order';

export default class OrderRepository {

  static save(userLoggedInId) {

    let userLoggedIn;
    let cartProducts;

    return UserRepository.findByPk(userLoggedInId)
      .then(user => {
        userLoggedIn = user;
        return user.getCart();
      })
      .then(cart => {
        cartProducts = cart.getProducts()
      })
      .then(() => userLoggedIn.createOrder())
      .then(order => {
        return order.addProducts(cartProducts.map(product => {
          product.OrderItem = { quantity: product.CartItem.quantity };
          return product;
        }));
      })
      .catch(err => console.log(err));
  }

  static findAll(userLoggedInId) {
    return UserRepository.findByPk(userLoggedInId)
      .then(user => user.getOrders({ include: ['products'] }))
      .catch(err => console.log(err));
  }

  static findByPk(orderId) {
    return Order.findByPk(orderId, { include: [ 'products' ] });
  }
};