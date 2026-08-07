const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    wasteType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "pending", // pending → approved → collected
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Waste", wasteSchema);
