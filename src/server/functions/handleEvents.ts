"use strict";

import { WebSocket, Server } from "ws";
import { createOrUpdate } from "./database";
import { limit } from "../functions/limit";

export function handleWsEvents(server: Server, config: any) {
  server.on("listening", () =>
    console.log(
      `[WS Server] --> WS server listening on ws://${config.hostname}:${config.ws_port}.`
    )
  );

  server.on("connection", (ws: WebSocket, _req: any) => {
    console.log(`[WS Server] --> ${server.clients.size} client(s) connected.`);

    limit(config.agent_update_ms, 1);

    ws.on("message", async (data: any) => {
      console.log(`[WS Server] --> Server received data: ${data}`);
      let parsed = JSON.parse(data);
      createOrUpdate(parsed);
    });

    ws.on("close", () => {
      console.log("[WS Server] --> Client closed connection.");
    });

    ws.onerror = function (error) {
      console.error("[WS Server] --> Error: ", error);
    };
  });
}
