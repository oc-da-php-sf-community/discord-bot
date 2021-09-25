import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import { DispatchData } from "/lib/Discord/types/DispatchData.ts";

type Data =
  | HelloData
  | HeartbeatAckData
  | IdentifyData
  | DispatchData
  | ReconnectData;

type HelloData = {
  op: OP_CODES.HELLO;
  d: {
    heartbeat_interval: number;
    _trace: string[];
  };
  t: null;
  s: null;
};

type HeartbeatAckData = {
  op: OP_CODES.HEARTBEAT_ACK;
  t: null;
  s: null;
};

type IdentifyData = {
  op: OP_CODES.IDENTIFY;
  d: {
    token: string;
    intents: number;
    properties: {
      $os: string;
      $browser: string;
      $device: string;
    };
  };
  t: null;
  s: null;
};

type ReconnectData = {
  op: OP_CODES.RECONNECT;
  d: null;
  t: null;
  s: null;
};

export type { Data, HelloData, IdentifyData };
