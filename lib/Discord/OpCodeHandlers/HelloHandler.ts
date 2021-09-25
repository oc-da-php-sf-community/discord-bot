import { AbstractHandler } from "/lib/Discord/OpCodeHandlers/AbstractHandler.ts";
import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import { Data } from "/lib/Discord/types/Data.ts";
import { OpCodeHandlerInterface } from "/lib/Discord/types/OpCodeHandlerInterface.ts";

class HelloHandler extends AbstractHandler implements OpCodeHandlerInterface {
  handle(data: Data) {
    if (data.op !== OP_CODES.HELLO) {
      throw new Error("Error while dispatching OP CODE to handler");
    }

    this._application.identify();
    setTimeout(
      () => {
        this._application.heartbeat();
      },
      data.d.heartbeat_interval * Math.random(),
    );
    this._application.heartbeatIntervalID = setInterval(
      () => this._application.heartbeat(),
      data.d.heartbeat_interval,
    );
  }
}

export { HelloHandler };
