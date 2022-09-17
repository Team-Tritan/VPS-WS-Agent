"use strict";

import os from "os";
import config from "../../../config";
import { formatSeconds, formatBytes, getExternalIP } from "./parseData";

export async function pushData(ws: any) {
  let clientIP = getExternalIP(ws);

  let info = {
    hostname: os.hostname().toString(),
    data: {
      time: new Date().toISOString(),
      platform: os.platform().toString(),
      uptime: formatSeconds(os.uptime()).toString(),
      memory_free: formatBytes(os.freemem()),
      total_memory: formatBytes(os.totalmem()),
      ip: clientIP,
    },
  };

  ws.send(JSON.stringify(info));

  console.log(
    `[WS Agent] --> Payload sent, waiting ${config.agent_update_ms}ms. `,
    JSON.stringify(info)
  );
}
