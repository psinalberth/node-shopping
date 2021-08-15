import express from 'express';
import path from 'path';
import routes from './routes'
import sequelize from './utils/database';
import rootDir from './utils/path';
import sync from './utils/sequelize-associations';
import User from './models/user';

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

app.use(routes);

// Database synchronization

sequelize.sync({
  force: DB_FORCE_SYNC
})
  .then(() => sync())
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  })
  .catch(error => console.log(error));

export default app;