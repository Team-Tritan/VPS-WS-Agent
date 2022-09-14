import WebSocketServer from "ws";
import config from "../../config";
import handleEvents from "./ws/wsEvents";

const server = new WebSocketServer.Server({ port: config.port });

handleEvents(server, config);
