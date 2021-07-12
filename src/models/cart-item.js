import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import Cart from './cart';

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'cart_item_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  }
},
{
  tableName: 'cart_item',
  timestampts: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

CartItem.belongsTo(Cart, {
  contstraints: true,
  onDelete: 'CASCADE',
  foreignKey: 'cart_id'
});

export default CartItem;