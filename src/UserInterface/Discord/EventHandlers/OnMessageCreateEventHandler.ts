import { DiscordEventHandler } from "/lib/Discord/types/DiscordEventHandler.ts";
import { DispatchData } from "/lib/Discord/types/DispatchData.ts";

class OnMessageCreateEventHandler implements DiscordEventHandler {
  public handle(data: DispatchData) {
    if (data.t !== "MESSAGE_CREATE") {
      return;
    }

    console.log(
      "Message created",
      data.d.member?.nick ?? data.d.author.username,
    );
  }
}

export { OnMessageCreateEventHandler };
