"use strict";

import mongoose from "mongoose";

const dataModel = new mongoose.Schema({
  hostname: String,
  hypervisor: Boolean,
  data: [
    {
      time: String,
      platform: String,
      uptime: String,
      memory_free: String,
      total_memory: String,
      ip: String,
    },
  ],
});

export default mongoose.models.VM_Data ||
  mongoose.model("VM_Data", dataModel, "VM_Data");
