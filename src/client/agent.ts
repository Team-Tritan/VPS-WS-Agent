import { WebSocket } from "ws";
import { pushData } from "./functions/pushData";
import config from "../../config";

class Agent {
  ws = new WebSocket(`ws://${config.hostname}:${config.ws_port}`);

  constructor() {
    this.acknowledge();
    this.onOpen();
    this.sendData();
    this.onClose();
    this.onError();
  }

  acknowledge() {
    console.log(
      `[WS Agent] Agent started, will post data every ${config.agent_update_ms}ms.`
    );
  }

  onOpen() {
    this.ws.onopen = function () {
      console.log(
        `[WS Agent] --> Connection initiated to ws server, ws://${config.hostname}:${config.ws_port}.`
      );
    };
  }

  sendData() {
    setInterval(() => {
      pushData(this.ws);
    }, config.agent_update_ms);
  }

  onClose() {
    this.ws.onclose = function (e: any) {
      console.log("[WS Agent] --> Socket is closed. Restarting.", e.reason);

      process.exit();
    };
  }

  onError() {
    let ws = this.ws;

    ws.onerror = function (err: any) {
      console.error("[WS Agent] --> Error:", err.message, "Closing socket.");
      ws.close();
    };
  }
}

new Agent();
