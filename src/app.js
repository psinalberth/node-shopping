import express from 'express';
import path from 'path';
import routes from './routes'
import sequelize from './utils/database';
import rootDir from './utils/path'

const app = express();

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

// Database synchronization

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => console.log('Listening at 3000 port...'));
  })
  .catch(error => console.log(error));

export default app;