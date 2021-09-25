import { DispatchData } from "/lib/Discord/types/DispatchData.ts";
import { EVENT_NAMES } from "/lib/Discord/enums/EventNames.ts";
import { DiscordEventHandler } from "/lib/Discord/types/DiscordEventHandler.ts";

class DiscordEventDispatcher {
  private listeners: Map<EVENT_NAMES, DiscordEventHandler[]>;

  constructor() {
    this.listeners = new Map();
  }

  public addEventListener(
    event: EVENT_NAMES,
    handler: DiscordEventHandler,
  ): void {
    this.listeners.set(event, [...this.listeners.get(event) ?? [], handler]);
  }

  public dispatch(data: DispatchData): void {
    const listeners = this.listeners.get(data.t);

    listeners?.forEach((handler) => {
      handler.handle(data);
    });
  }
}

export { DiscordEventDispatcher };
