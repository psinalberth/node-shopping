import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'cart_id'
  }
},
{
  tableName: 'cart'
});
  
export default Cart;