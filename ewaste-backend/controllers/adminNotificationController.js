const Notification = require("../models/notificationModel");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch notifications",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotifications,
};
