import WebSocketServer from "ws";
import config from "../../config";
import handleEvents from "./ws/wsEvents";
import { initDatabaseConnection } from "./db/dbFunctions";

export default class App {
  server = new WebSocketServer.Server({ port: config.port });

  constructor() {
    initDatabaseConnection(this.server);
    handleEvents(this.server, config);
  }
}

new App();
