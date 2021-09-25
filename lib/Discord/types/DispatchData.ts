import { EVENT_NAMES } from "/lib/Discord/enums/EventNames.ts";
import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import {
  GuildMemberData,
  MessageData,
} from "/lib/Discord/types/EventsPayloadData.ts";

type DispatchData =
  | MessageCreateData
  | MessageUpdateData
  | MessageDeleteData
  | MessageDeleteBulkData
  | GuildMemberAdd;

type MessageCreateData = {
  op: OP_CODES.DISPATCH;
  t: EVENT_NAMES.MESSAGE_CREATE;
  d: MessageData;
  s: null | number;
};

type MessageUpdateData = {
  op: OP_CODES.DISPATCH;
  t: EVENT_NAMES.MESSAGE_UPDATE;
  d: MessageData;
  s: null | number;
};

type MessageDeleteData = {
  op: OP_CODES.DISPATCH;
  t: EVENT_NAMES.MESSAGE_DELETE;
  d: {
    id: string;
    channel_id: string;
    guild_id?: string;
  };
  s: null | number;
};

type MessageDeleteBulkData = {
  op: OP_CODES.DISPATCH;
  t: EVENT_NAMES.MESSAGE_DELETE_BULK;
  d: {
    ids: string[];
    channel_id: string;
    guild_id?: string;
  };
};

type GuildMemberAdd = {
  op: OP_CODES.DISPATCH;
  t: EVENT_NAMES.GUILD_MEMBER_ADD;
  d: GuildMemberData;
  s: null | number;
};

export type { DispatchData, MessageCreateData };
