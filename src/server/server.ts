"use strict";

import { Server } from "ws";
import { initDatabase } from "./functions/database";
import { handleWsEvents } from "./functions/handleEvents";
import config from "../config";

class WebSuccItServer {
  server: Server = new Server({ port: config.ws_server_port });
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
