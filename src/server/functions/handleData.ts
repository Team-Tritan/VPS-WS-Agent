"use strict";

import mongoose from "mongoose";
import config from "../../config";
import dataModel from "../../models/dataModel";

export async function initDatabase(server: any) {
  server.db = await mongoose
    .connect(config.mongodb_uri)
    .then((mongoose: any) => {
      console.log(`[WS Server] --> Connected to db, ${config.mongodb_uri}.`);
      return mongoose;
    });
}

export async function createOrUpdate(parsed: any, clientIp: any) {
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
          total_memory: parsed.data.total_memory,
          ip: clientIp.toString(),
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
          total_memory: parsed.data.total_memory,
          ip: clientIp.toString(),
        },
      },
    });
    return;
  }
}
