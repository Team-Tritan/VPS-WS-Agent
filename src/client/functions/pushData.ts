"use strict";

import os from "os";
import config from "../../../config";
import { formatSeconds, formatBytes } from "./parseData";

export async function pushData(ws: any) {
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
    `[WS Agent] --> Payload sent, waiting ${config.agent_update_ms}ms. `,
    JSON.stringify(info)
  );
}
