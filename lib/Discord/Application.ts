import { configs } from "/config.ts";
import { OP_CODES } from "/lib/Discord/enums/OpCodes.ts";
import { Data, IdentifyData } from "/lib/Discord/types/Data.ts";
import { DiscordEventDispatcher } from "/lib/Discord/DiscordEventDispatcher.ts";
import { EVENT_NAMES } from "/lib/Discord/enums/EventNames.ts";
import { OnGuildMemberAddEventHandler } from "/src/UserInterface/Discord/EventHandlers/OnGuildMemberAddEventHandler.ts";
import { OnMessageCreateEventHandler } from "/src/UserInterface/Discord/EventHandlers/OnMessageCreateEventHandler.ts";
import { INTENTS } from "/lib/Discord/enums/Intents.ts";
import { OpCodeDispatcher } from "/lib/Discord/OpCodeDispatcher.ts";
import { HelloHandler } from "/lib/Discord/OpCodeHandlers/HelloHandler.ts";
import { DispatchHandler } from "/lib/Discord/OpCodeHandlers/DispatchEventsHandler.ts";
import { HeartbeatAckHandler } from "/lib/Discord/OpCodeHandlers/HeartbeatAckHandler.ts";
import { ReconnectHandler } from "/lib/Discord/OpCodeHandlers/ReconnectHandler.ts";

function getIntents(): number {
  return INTENTS.GUILDS | INTENTS.GUILD_MESSAGES;
}

class Application {
  private _hasReceivedHeartBeatResponse: boolean = false;
  private _discordGatewayUrl: string;
  private _ws: WebSocket | undefined;
  private _discordEventDispatcher: DiscordEventDispatcher;
  private _discordOpCodeDispatcher: OpCodeDispatcher;
  private _heartbeatIntervalID: undefined | number = undefined;

  constructor(discordGatewayUrl: string) {
    this._discordGatewayUrl = discordGatewayUrl;

    this._discordOpCodeDispatcher = new OpCodeDispatcher();

    this._discordOpCodeDispatcher.addEventListener(
      OP_CODES.HELLO,
      new HelloHandler(this),
    );

    this._discordOpCodeDispatcher.addEventListener(
      OP_CODES.DISPATCH,
      new DispatchHandler(this),
    );

    this._discordOpCodeDispatcher.addEventListener(
      OP_CODES.HEARTBEAT_ACK,
      new HeartbeatAckHandler(this),
    );

    this._discordOpCodeDispatcher.addEventListener(
      OP_CODES.RECONNECT,
      new ReconnectHandler(this),
    );

    this._discordEventDispatcher = new DiscordEventDispatcher();

    this._discordEventDispatcher.addEventListener(
      EVENT_NAMES.GUILD_MEMBER_ADD,
      new OnGuildMemberAddEventHandler(),
    );

    this._discordEventDispatcher.addEventListener(
      EVENT_NAMES.MESSAGE_CREATE,
      new OnMessageCreateEventHandler(),
    );
  }

  public set heartbeatIntervalID(heartbeatIntervalID: number) {
    this._heartbeatIntervalID = heartbeatIntervalID;
  }

  public receiveHeartBeatResponse() {
    console.log("RECEIVED ACK");
    this._hasReceivedHeartBeatResponse = true;
  }

  public waitHeartBeatResponse() {
    this._hasReceivedHeartBeatResponse = false;
  }

  public getHasReceivedHeartBeatResponse() {
    return this._hasReceivedHeartBeatResponse;
  }

  public getDiscordGatewayUrl() {
    return this._discordGatewayUrl;
  }

  public identify() {
    console.log("START IDENTIFY");
    const token = configs.token;

    if (!token) {
      throw new Error(
        "The discord applicaiton token is not set in environment",
      );
    }

    if (!this._ws) {
      throw new Error("Cannot identify if websocket connection isn't set");
    }

    const payload: IdentifyData = {
      op: OP_CODES.IDENTIFY,
      d: {
        token,
        intents: getIntents(),
        properties: {
          $os: "linux",
          $device: "pff",
          $browser: "pdd",
        },
      },
      s: null,
      t: null,
    };

    this._ws.send(JSON.stringify(payload));
    console.log("SENT IDENTIFY");
  }

  public heartbeat() {
    console.log("HEARTBEAT");
    const payload = { op: OP_CODES.HEARTBEAT, d: {}, s: null, t: null };

    if (!this._ws) {
      this.restart();
      return;
    }

    this._ws.send(JSON.stringify(payload));
    this.waitHeartBeatResponse();
    console.log("SENT HEARTBEAT");
  }

  public dispatchDiscordEvent(data: Data) {
    if (data.op !== OP_CODES.DISPATCH) {
      throw new Error("Trying to dispatch a Discord Event on wrong OP CODE");
    }

    this._discordEventDispatcher.dispatch(data);
  }

  public start() {
    this._ws = new WebSocket(
      `${this.getDiscordGatewayUrl()}?v=9&encoding=json`,
    );

    this._ws.onopen = () => {
      console.log("open");
    };

    this._ws.onmessage = (message) => {
      if (!this._ws) {
        return;
      }

      const { data }: { data: string } = message;
      const parsedData: Data = JSON.parse(data);

      // console.log(parsedData);
      this._discordOpCodeDispatcher.dispatch(parsedData);

      if (
        ![
          OP_CODES.DISPATCH,
          OP_CODES.HEARTBEAT,
          OP_CODES.HEARTBEAT_ACK,
          OP_CODES.HELLO,
          OP_CODES.IDENTIFY,
          OP_CODES.RECONNECT,
        ].includes(parsedData.op)
      ) {
        console.log(parsedData);
      }
    };

    this._ws.onclose = () => {
      if (this._heartbeatIntervalID) {
        clearInterval(this._heartbeatIntervalID);
      }
      console.log("Close");
    };
  }

  public restart() {
    console.log("Restart");
    this._hasReceivedHeartBeatResponse = false;
    this._ws?.close();
    this._ws = undefined;
    clearInterval(this._heartbeatIntervalID);
    this._heartbeatIntervalID = undefined;

    this.start();
  }
}

export { Application };
