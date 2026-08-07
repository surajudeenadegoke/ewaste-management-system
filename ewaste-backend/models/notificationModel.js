const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "info",
          "success",
          "warning",
        ],
        default: "info",
      },

      read: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

// Prevent overwrite error
const Notification =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema
  );

module.exports = Notification;