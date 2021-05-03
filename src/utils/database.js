import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_ROOT_USER,
  process.env.MYSQL_ROOT_PASSWORD, {
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
  }
);

export default sequelize;