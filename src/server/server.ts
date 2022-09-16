import WebSocketServer from "ws";
import config from "../../config";
import { handleWsEvents } from "./ws/events";
import { initDatabaseConnection } from "./db/functions";

class App {
  server = new WebSocketServer.Server({ port: config.ws_port });
  config = config;
  constructor() {
    initDatabaseConnection(this.server);
    handleWsEvents(this.server, this.config);
  }
}

new App();
