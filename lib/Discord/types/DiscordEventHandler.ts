import { DispatchData } from "/lib/Discord/types/DispatchData.ts";

interface DiscordEventHandler {
  handle: (data: DispatchData) => void;
}

export type { DiscordEventHandler };
