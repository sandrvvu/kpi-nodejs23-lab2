import { delay } from '../utils/server-helpers.js';

export const controllers = {
  getController: async (req, res, payload, query) => {
    await delay(3000);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ message: `Hi from get controller!'`, payload, query }));
  },

  postController: async (req, res, payload, query) => {
    await delay(2000);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ message: `Hi from post controller!'`, user: payload, query }));
  },

  optionsController: async (req, res) => {
    await delay(4000);
    res.setHeader('Allow', 'OPTIONS, GET, POST');
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi from options controller!');
  },
};
