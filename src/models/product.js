import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import User from './user'

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
  timestamps: false
});

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

export default Product;