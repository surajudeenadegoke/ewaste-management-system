const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  rewardPoints: {
    type: Number,
    default: 0,
  },
});

//  Prevent model overwrite
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
