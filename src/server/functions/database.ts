"use strict";

import mongoose from "mongoose";
import config from "../../../config";
import dataModel from "../models/dataModel";

export async function initDatabase(server: any) {
  server.db = await mongoose.connect(config.mongodb).then((mongoose: any) => {
    console.log(`[WS Server] --> Connected to db, ${config.mongodb}.`);
    return mongoose;
  });
}

export async function createOrUpdate(parsed: any) {
  let x = await dataModel.findOne({ hostname: parsed.hostname });

  if (!x) {
    console.log(`[WS Server] --> Encountered new agent on ${parsed.hostname}.`);

    await new dataModel({
      hostname: parsed.hostname,
      data: [
        {
          time: parsed.data.time,
          platform: parsed.data.platform,
          uptime: parsed.data.uptime,
          memory_free: parsed.data.memory_free,
          memory_used: parsed.data.memory_used,
        },
      ],
    }).save();

    return;
  } else {
    await x.updateOne({
      $push: {
        data: {
          time: parsed.data.time,
          platform: parsed.data.platform,
          uptime: parsed.data.uptime,
          memory_free: parsed.data.memory_free,
          memory_used: parsed.data.memory_used,
        },
      },
    });
    return;
  }
}
