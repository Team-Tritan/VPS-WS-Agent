import { WebSocket } from "ws";
import { createOrUpdate } from "../db/dbFunctions";

export default function wsEvents(server: any, config: any) {
  server.on("listening", () =>
    console.log(`[WS Server] --> Listening on port ${config.port}.`)
  );

  server.on("connection", (ws: WebSocket) => {
    console.log("[WS Server] --> Node Connected");

    ws.on("message", async (data: any) => {
      console.log(`[WS Server] --> Data Received: ${data}`);
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
