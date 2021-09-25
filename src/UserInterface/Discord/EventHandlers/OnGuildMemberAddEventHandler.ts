import { DiscordEventHandler } from "/lib/Discord/types/DiscordEventHandler.ts";

class OnGuildMemberAddEventHandler implements DiscordEventHandler {
  public handle() {
    console.log();
  }
}

export { OnGuildMemberAddEventHandler };
