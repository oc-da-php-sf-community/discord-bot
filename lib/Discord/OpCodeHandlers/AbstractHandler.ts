import { Application } from "/lib/Discord/Application.ts";

abstract class AbstractHandler {
  protected _application: Application;

  constructor(app: Application) {
    this._application = app;
  }
}

export { AbstractHandler };
