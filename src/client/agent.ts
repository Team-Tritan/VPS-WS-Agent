<<<<<<< HEAD
"use strict";

import { WebSocket } from "ws";
import { pushData } from "./functions/pushData";
import config from "../../config";

class Agent {
  ws: WebSocket = new WebSocket(`ws://${config.hostname}:${config.ws_port}`);

  constructor() {
    this.hewwo();
    this.open();
    this.send();
    this.close();
    this.error();
  }

  hewwo() {
    console.log(
      `[WS Agent] Agent started, will post data every ${config.agent_update_ms}ms.`
    );
  }

  open() {
    this.ws.onopen = function () {
      console.log(
        `[WS Agent] --> Connection initiated to ws server, ws://${config.hostname}:${config.ws_port}.`
      );
    };
  }

  send() {
    setInterval(() => {
      pushData(this.ws);
    }, config.agent_update_ms);
  }

  close() {
    this.ws.onclose = function (e: any) {
      console.log("[WS Agent] --> Socket is closed. Restarting.", e.reason);

      process.exit();
    };
  }

  error() {
    let ws = this.ws;

    ws.onerror = function (err: any) {
      console.error("[WS Agent] --> Error:", err.message, "Closing socket.");
      ws.close();
    };
  }
}

new Agent();
