"use strict";

import mongoose from "mongoose";
import config from "../../config";

export async function initDatabase() {
  await mongoose.connect(config.mongodb).then((mongoose: any) => {
    console.log(`[WS Web Helper] --> Connected to db, ${config.mongodb}.`);
    return mongoose;
  });
}
