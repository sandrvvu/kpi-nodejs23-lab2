export class CustomRouter {
  constructor() {
    this._routes = new Map();
  }

  addRoute(url, method, controller) {
    const key = method.toUpperCase() + url;
    const existingController = this._routes.get(key);

    if (existingController) {
      console.warn(`Route ${key} already exists. Overriding it.`);
    }

    this._routes.set(key, controller);
  }

  removeRoute(url, method) {
    const key = method.toUpperCase() + url;
    this._routes.delete(key);
  }

  get routes() {
    return this._routes;
  }
}
