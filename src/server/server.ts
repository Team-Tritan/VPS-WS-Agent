import WebSocketServer from "ws";
import config from "../../config";
import { handleWsEvents } from "./functions/handleEvents";
import { initDatabase } from "./functions/database";

class Server {
  server = new WebSocketServer.Server({ port: config.ws_port });
  config = config;
  constructor() {
    initDatabase(this.server);
    handleWsEvents(this.server, this.config);
  }
}

new Server();
