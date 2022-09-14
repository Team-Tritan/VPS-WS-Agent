import WebSocket from "ws";
import os from "os";
import config from "../../../config";
import {
  formatSeconds,
  formatBytes,
  getExternalIP,
} from "../functions/dataHandling";

export async function initWsClient() {
  let ws = new WebSocket(`${config.hostname}:${config.port}`);
  let ip = await getExternalIP();

  ws.onopen = function () {
    console.log(`[WS Client] --> Connection initiated to ws server.`);

    let data = {
      time: new Date().toISOString(),
      hostname: os.hostname().toString(),
      platform: os.platform().toString(),
      ip: ip,
      uptime: formatSeconds(os.uptime()).toString(),
      memory_free: formatBytes(os.freemem()),
      total_memory: formatBytes(os.totalmem()),
    };

    ws.send(JSON.stringify(data));

    console.log(`[WS Client] --> Payload sent, closing connection.`);

    return ws.close();
  };

  ws.onclose = function (e) {
    console.log(
      "[WS Client] Socket is closed. Reconnect will be attempted in 1 minute.",
      e.reason
    );
  };

  ws.onerror = function (err) {
    console.error("[WS Client] Error: ", err.message, "Closing socket");
    ws.close();
  };
}
