import express, { Application, Request, Response } from "express";
import { initDatabase } from "./functions/database";
import dataModel from "./models/dataModel";
import config from "../config";

let app: Application = express();

initDatabase();

app.set("view engine", "ejs");
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
  let dbData = await dataModel.find();
  let arr: Array<Object> = [];

  await dbData.forEach((x) => {
    arr.push({ hostname: x.hostname, data: x.data });
  });

  return res.render("index", {
    hosts: arr,
  });
});

app.listen(config.web_port, () => {
  console.log(`[WS Web Helper] --> Listening on port ${config.web_port}.`);
});
