import mongoose from "mongoose";
import config from "../../../config";
import dataModel from "./dataModel";

export async function initDatabaseConnection(server: any) {
  server.db = await mongoose.connect(config.mongodb).then((mongoose: any) => {
    console.log(`[WS Server] --> Connected to DB, ${config.mongodb}.`);
    return mongoose;
  });
}

export async function createOrUpdate(parsed: any) {
  let x = await dataModel.findOne({ hostname: parsed.hostname });

  if (!x) {
    console.log("[WS Server] --> Machine not found, creating record.");

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
    console.log("[WS Server] --> Data has been recorded.");

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

    console.log("[WS Server] --> Data has been recorded.");
    return;
  }
}