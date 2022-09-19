import express, { Application, Request, Response } from "express";
import { initDatabase } from "./functions/database";
import dataModel from "./models/dataModel";
import config from "../config";

class WebHelper {
  app: Application = express();

  constructor() {
    this.setup();
    this.uiRoute();
    this.listen();
  }

  setup() {
    initDatabase();
    this.app.set("view engine", "ejs");
    this.app.use(express.json());
  }

  uiRoute() {
    this.app.get("/", async (_req: Request, res: Response) => {
      let dbData = await dataModel.find();
      let arr: Array<Object> = [];

      await dbData.forEach((x) => {
        arr.push({ hostname: x.hostname, data: x.data });
      });

      return res.render("index", {
        hosts: arr,
        update_time: config.agent_update_ms,
      });
    });
  }

  listen() {
    this.app.listen(config.web_port, () => {
      console.log(`[WS Web Helper] --> Listening on port ${config.web_port}.`);
    });
  }
}

new WebHelper();
