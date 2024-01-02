import HttpServer from './server/http-server.js';
import { router } from './features/routes.js';

const httpServer = new HttpServer(router.routes);
httpServer.start();
