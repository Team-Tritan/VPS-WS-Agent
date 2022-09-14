import { initWsClient } from "./ws/initConnection";

console.log(`[WS Client] --> Started, will attempt connect in 1 minute.`);

setInterval(() => {
  initWsClient();
}, 1 * 60000);
