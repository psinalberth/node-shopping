import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'order_item_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  }
},
{
  tableName: 'order_item',
  timestampts: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default OrderItem;