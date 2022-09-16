import { pushData } from "./ws/websocketClient";
import config from "../../config";

console.log(`[WS Agent] Agent started, will attempt connection in 1 minute.`);

setInterval(() => {
  pushData();
}, config.agent_refresh_ms);
