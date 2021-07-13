import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import User from './user';
import Cart from './cart';
import CartItem from './cart-item';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'product_id'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(600),
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'image_url'
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, 
{
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

Product.belongsToMany(Cart, {
  constraints: true,
  through: CartItem,
  foreignKey: 'product_id',
  otherKey: 'cart_id'
});

export default Product;