import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import User from './user';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'order_id'
  }
},
{
  tableName: 'order',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Order.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

export default Order;