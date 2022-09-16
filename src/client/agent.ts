import { createConnection } from "./lib/createConnection";
import config from "../../config";

console.log(
  `[WS Agent] Agent started, will post data every ${config.agent_update_ms}ms.`
);

createConnection();
