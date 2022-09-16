import { WebSocket } from "ws";
import { pushData } from "./functions/pushData";
import config from "../../config";

console.log(
  `[WS Agent] Agent started, will post data every ${config.agent_refresh_ms}ms.`
);

function connect() {
  let ws = new WebSocket(`ws://${config.hostname}:${config.ws_port}`);

  ws.onopen = function () {
    console.log(
      `[WS Agent] --> Connection initiated to ws server, ws://${config.hostname}:${config.ws_port}.`
    );
  };

  setInterval(() => {
    pushData(ws);
  }, config.agent_refresh_ms);

  ws.onclose = function (e: any) {
    console.log("[WS Agent] --> Socket is closed. Reconnecting.", e.reason);

    setTimeout(function () {
      connect();
    }, 1000);
  };

  ws.onerror = function (err: any) {
    console.error("[WS Agent] --> Error:", err.message, "Closing socket.");
    ws.close();
  };
}

connect();
