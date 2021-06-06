import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'cart_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  }
});

export default CartItem;