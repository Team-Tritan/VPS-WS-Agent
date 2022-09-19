import express, { Application, Request, Response } from "express";
import { initDatabase, doDBMagic } from "./functions/handleData";
import config from "../config";

class WebHelper {
  app: Application = express();

  constructor() {
    this.setup();
    this.routes();
    this.listen();
  }

  setup() {
    initDatabase();
    this.app.set("view engine", "ejs");
    this.app.use(express.json());
  }

  routes() {
    this.app.get("/", async (_req: Request, res: Response) => {
      let arr = await doDBMagic();

      return res.render("index", {
        hosts: arr,
        update_time: config.agent_update_ms,
      });
    });
  }

  listen() {
    this.app.listen(config.web_helper_port, () => {
      console.log(`[WS Web Helper] --> Listening on port ${config.web_helper_port}.`);
    });
  }
}

new WebHelper();
