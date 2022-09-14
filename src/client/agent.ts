import { initWsConnection } from "./ws/initConnection";
console.log(`[WS Client] --> Started, will attempt connect in 1 minute.`);
setInterval(() => initWsConnection(), 1 * 60000);
