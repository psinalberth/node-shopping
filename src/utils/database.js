import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_ROOT_USER,
  process.env.MYSQL_ROOT_PASSWORD, 
  {
    charset: process.env.MYSQL_CHARSET,
    collate: process.env.MYSQL_COLLATE,
    dialect: process.env.MYSQL_DIALECT,
    port: process.env.MYSQL_PORT
  }
);

export default sequelize;