import { Server } from "ws";
import config from "../../config";
import { initDatabase } from "./functions/database";
import { handleWsEvents } from "./functions/handleEvents";

class WebSuccItServer {
  server = new Server({ port: config.ws_port });
  config = config;

  constructor() {
    this.buildLazily();
  }

  buildLazily() {
    initDatabase(this.server);
    handleWsEvents(this.server, this.config);
  }
}

new WebSuccItServer();
