import { AbstractHandler } from "/lib/Discord/OpCodeHandlers/AbstractHandler.ts";
import { Data } from "/lib/Discord/types/Data.ts";
import { OpCodeHandlerInterface } from "/lib/Discord/types/OpCodeHandlerInterface.ts";

class ReconnectHandler extends AbstractHandler
  implements OpCodeHandlerInterface {
  public handle(data: Data) {
    this._application.restart();
  }
}

export { ReconnectHandler };
