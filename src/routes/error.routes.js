import { Router } from 'express';
import ErrorController from '../controllers/error.controller';

const routes = Router();

routes.use(ErrorController.pageNotFound);

routes.use(ErrorController.internalServerError);

export default routes;