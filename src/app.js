import express from 'express';
import path from 'path';
import routes from './routes'
import sequelize from './utils/database';
import rootDir from './utils/path'
import ErrorController from './controllers/error.controller'

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

app.get('/', (req, res, next) => {
  res.render(path.join(__dirname, 'views', 'index.pug'));
});

app.use(ErrorController.pageNotFound);

// Database synchronization

sequelize.sync({
  force: DB_FORCE_SYNC
})
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at ${PORT} port...`));
  })
  .catch(error => console.log(error));

export default app;