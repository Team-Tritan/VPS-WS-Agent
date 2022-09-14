import WebSocketServer, { WebSocket } from "ws";
import config from "../../config";

var server = new WebSocketServer.Server({ port: config.port });

server.on("listening", () =>
  console.log(`[WS Server] --> Listening on port ${config.port}.`)
);

server.on("connection", (ws: WebSocket) => {
  console.log("[WS Server] --> Node Connected");

  ws.on("message", (data: any) => {
    console.log(`[WS Server] Data Received: ${data}`);
    let parsed = JSON.parse(data);
    // do stuff wiff data
  });

  ws.on("close", () => {
    console.log("[WS Server] Client closed connection.");
  });

  ws.onerror = function (error) {
    console.error("[WS Server] Error: ", error);
  };
});
