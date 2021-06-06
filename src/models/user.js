import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'user_id'
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
},
{
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;