import { initWsConnection } from "./ws/websocketClient";

console.log(
  `[WS Agent] --> Agent started, will attempt connection in 1 minute.`
);

setInterval(() => {
  initWsConnection();
}, 1 * 60000);
