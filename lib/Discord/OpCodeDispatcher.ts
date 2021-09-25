import { Data } from "/lib/Discord/types/Data.ts";
import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import { OpCodeHandlerInterface } from "/lib/Discord/types/OpCodeHandlerInterface.ts";

class OpCodeDispatcher {
  private _listeners: Map<OP_CODES, OpCodeHandlerInterface[]>;

  constructor() {
    this._listeners = new Map();
  }

  public addEventListener(
    opCode: OP_CODES,
    handler: OpCodeHandlerInterface,
  ) {
    this._listeners.set(opCode, [
      ...this._listeners.get(opCode) ?? [],
      handler,
    ]);
  }

  public dispatch(data: Data) {
    this._listeners.get(data.op)?.forEach((handler) => handler.handle(data));
  }
}

export { OpCodeDispatcher };
