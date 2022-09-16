import { pushData } from "./ws/websocketClient";

console.log(`[WS Agent] Agent started, will attempt connection in 1 minute.`);

setInterval(() => {
  pushData();
}, 1 * 60000);
