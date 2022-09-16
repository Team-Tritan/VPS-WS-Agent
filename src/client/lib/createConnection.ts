import config from "../../../config";
import { pushData } from "../functions/pushData";
import { WebSocket } from "ws";

export function createConnection() {
  let ws = new WebSocket(`ws://${config.hostname}:${config.ws_port}`);

  ws.onopen = function () {
    console.log(
      `[WS Agent] --> Connection initiated to ws server, ws://${config.hostname}:${config.ws_port}.`
    );
  };

  setInterval(() => {
    pushData(ws);
  }, config.agent_update_ms);

  ws.onclose = function (e: any) {
    console.log(
      "[WS Agent] --> Socket is closed. Reconnecting in 10 seconds.",
      e.reason
    );

    setTimeout(function () {
      createConnection();
    }, config.agent_reconnect_delay);
  };

  ws.onerror = function (err: any) {
    console.error("[WS Agent] --> Error:", err.message, "Closing socket.");
    ws.close();
  };
}
