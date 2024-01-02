import http from 'node:http';
import process from 'node:process';
import { parseOptions, parseBody } from '../utils/parse-helpers.js';
import { errorMessage, gracefulShutdown } from '../utils/server-helpers.js';

const PORT = 3000;
const BASE_URL = 'http://localhost:3000';

export default class HttpServer {
  constructor(routing) {
    this.routing = routing;
    this.server = this.createHttpServer(routing, PORT);
  }

  createHttpServer(routing, port) {
    const server = http
      .createServer(async (req, res) => {
        const requestUrl = new URL(req.url, BASE_URL);
        const handlerKey = req.method + requestUrl.pathname;

        const routeHandler = routing.get(handlerKey);
        if (!routeHandler) return errorMessage(res, 404, 'Not Found');

        const contentType = req.headers['content-type']?.split(';')[0];
        const parser = parseOptions[contentType];
        let payload = {};

        if (contentType && parser) payload = await parseBody(req, parser);

        try {
          await routeHandler(req, res, payload, Object.fromEntries(requestUrl.searchParams));
        } catch (error) {
          console.error(error);
          errorMessage(res, 500, 'Internal Server Error');
        }
      })
      .listen(port, () => console.log('Server started on port: ', port));

    server.on('clientError', (err, socket) => {
      console.error(err);
      socket.end('Bad Request!');
    });

    process.on('SIGINT', () => {
      gracefulShutdown(server);
    });

    return server;
  }

  start() {
    console.log('Starting the server...');
  }
}
