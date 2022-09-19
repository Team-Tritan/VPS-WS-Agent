"use strict";

import mongoose from "mongoose";
import config from "../../config";
import dataModel from "../models/dataModel";

export async function initDatabase() {
  await mongoose.connect(config.mongodb_uri).then((mongoose: any) => {
    console.log(`[WS Web Helper] --> Connected to db, ${config.mongodb_uri}.`);
    return mongoose;
  });
}

export async function doDBMagic() {
  let dbData = await dataModel.find();
  let arr: Array<Object> = [];

  await dbData.forEach((x) => {
    arr.push({ hostname: x.hostname, data: x.data });
  });

  return arr;
}
