const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    waste: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Waste",
      required: true,
    },

    rewardPoints: {
      type: Number,
      default: 0,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Earned"],
      default: "Earned",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reward", rewardSchema);
