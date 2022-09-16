import WebSocket from "ws";
import os from "os";
import config from "../../../config";
import { formatSeconds, formatBytes } from "../functions/data";

export async function pushData() {
  let ws = new WebSocket(`ws://${config.hostname}:${config.ws_port}`);

  ws.onopen = function () {
    console.log(
      `[WS Agent] --> Connection initiated to ws server, ws://${config.hostname}:${config.ws_port}.`
    );

    let info = {
      hostname: os.hostname().toString(),
      data: {
        time: new Date().toISOString(),
        platform: os.platform().toString(),
        uptime: formatSeconds(os.uptime()).toString(),
        memory_free: formatBytes(os.freemem()),
        total_memory: formatBytes(os.totalmem()),
      },
    };

    ws.send(JSON.stringify(info));

    console.log(
      `[WS Agent] --> Payload sent, closing connection. `,
      JSON.stringify(info)
    );

    ws.close();
  };

  ws.onclose = function (e) {
    console.log(
      "[WS Agent] --> Socket is closed. Reconnect will be attempted in 1 minute.",
      e.reason
    );
  };

  ws.onerror = function (err) {
    console.error("[WS Agent] --> Error: ", err.message, ". Closing socket.");
    ws.close();
  };
}
