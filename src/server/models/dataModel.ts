import mongoose from "mongoose";

const dataModel = new mongoose.Schema({
  hostname: String,
  data: [
    {
      time: String,
      platform: String,
      uptime: String,
      memory_free: String,
      total_memory: String,
    },
  ],
});

export default mongoose.models.Data || mongoose.model("Data", dataModel);
