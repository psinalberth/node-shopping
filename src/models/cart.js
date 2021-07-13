import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import User from './user';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'cart_id'
  }
},
{
  tableName: 'cart',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Cart.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

export default Cart;