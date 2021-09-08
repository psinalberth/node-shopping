import express from 'express';
import path from 'path';
// import routes from './routes'
import {  mongoConnect } from './utils/database';
import rootDir from './utils/path';
import Product from './models/product';

const app = express();
const DB_FORCE_SYNC = process.env.DB_FORCE_SYNC | 0;
const PORT = process.env.PORT | 3000;

// Template engine configuration

app.set('view engine', 'pug');

// Body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static resources

app.use(express.static(path.join(rootDir, 'public')));
app.use('/libraries', express.static(path.join(rootDir, '..', 'node_modules')));
app.use('/libraries', express.static(path.join(rootDir, 'public')));

// Routes

// app.use(routes);

// Database synchronization
mongoConnect(() => {
  app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  console.log(new Product('Book', 19.69, 'Some random book', 'http://url.com/12345'));
});
  // .then(() => {
  //   app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  // })

// sequelize.sync({
//   force: DB_FORCE_SYNC
// })
//   .then(() => sync())
//   .then(() => User.findByPk(1))
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
  // .then(() => {
  //   app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  // })

export default app;