import { CustomRouter } from './router.js';
import { controllers } from './controller.js';

export const router = new CustomRouter();

router.addRoute('/', 'GET', controllers.getController);
router.addRoute('/user', 'POST', controllers.postController);
router.addRoute('/example', 'OPTIONS', controllers.optionsController);
