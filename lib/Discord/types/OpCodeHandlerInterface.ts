import { Data } from "/lib/Discord/types/Data.ts";

interface OpCodeHandlerInterface {
  handle: (data: Data) => void;
}

export type { OpCodeHandlerInterface };
