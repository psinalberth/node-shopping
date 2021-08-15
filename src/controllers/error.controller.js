import path from 'path';
import rootDir from '../utils/path';

export default class ErrorController {

  static pageNotFound(req, res, next) {
    res.status(404).render(path.join(rootDir, 'views', 'error', '404.pug'));
  }

  static internalServerError(req, res, next) {
    res.status(500).render(path.join(rootDir, 'views', 'error', '500.pug'));
  }
}