import { AbstractHandler } from "/lib/Discord/OpCodeHandlers/AbstractHandler.ts";
import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import { Data } from "/lib/Discord/types/Data.ts";
import { OpCodeHandlerInterface } from "/lib/Discord/types/OpCodeHandlerInterface.ts";

class DispatchHandler extends AbstractHandler
  implements OpCodeHandlerInterface {
  public handle(data: Data) {
    if (data.op !== OP_CODES.DISPATCH) {
      return;
    }

    this._application.dispatchDiscordEvent(data);
  }
}

export { DispatchHandler };
