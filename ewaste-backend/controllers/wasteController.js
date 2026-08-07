const Waste = require("../models/wasteModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Reward = require("../models/rewardModel");
const rewardPoints = require("../utils/rewardPoints");

// CREATE WASTE REQUEST
const createWaste = async (req, res) => {
  try {
    const waste = await Waste.create({
      user: req.user.id,
      wasteType: req.body.wasteType,
      pickupDate: req.body.pickupDate,
      quantity: req.body.quantity,
      location: req.body.location,
      status: "pending",
    });

    res.status(201).json({
      message: "Waste request submitted successfully",
      waste,
    });
  } catch (error) {
    //catch (error) {
    //res.status(500).json({
    // message: "Failed to submit waste",
    // error: error.message,
    //});
    //}

    console.log("CREATE WASTE ERROR:", error);

    res.status(500).json({
      message: "Failed to submit waste",
      error: error.message,
    });
  }
};

// GET USER WASTE REQUESTS

const getUserWaste = async (req, res) => {
  try {
    const wastes = await Waste.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const user = await User.findById(req.user.id).select("rewardPoints");

    res.json({
      wastes,
      rewardPoints: user.rewardPoints,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL WASTE (ADMIN)
const getAllWaste = async (req, res) => {
  try {
    const wastes = await Waste.find().populate("user", "name email");

    res.json(wastes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE WASTE STATUS

const updateWasteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user");

    // Create notification message
    let message = "";

    if (status === "approved") {
      message = "Your waste has been approved 🚚";
    } else if (status === "collected") {
      message = "Waste collected successfully ♻️ Points added!";
    } else {
      message = "Your waste request has been updated";
    }

    await Notification.create({
      user: waste.user._id,
      message,
      type: "success",
    });

    res.json({
      message: "Status updated + notification sent",
      waste,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//GET NOTIFICATION
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// APPROVE WASTE AND AWARD POINTS
const approveWaste = async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);

    if (!waste) {
      return res.status(404).json({
        message: "Waste submission not found",
      });
    }

    // Prevent duplicate approval and duplicate points
    if (waste.status === "approved") {
      return res.status(400).json({
        message: "Waste has already been approved",
      });
    }

    if (waste.status === "collected") {
      return res.status(400).json({
        message: "Collected waste cannot be approved again",
      });
    }

    const user = await User.findById(waste.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const points = rewardPoints[waste.wasteType] || 10;

    // Update status using lowercase value
    waste.status = "approved";
    await waste.save();

    // Award points once
    user.rewardPoints = (user.rewardPoints || 0) + points;
    await user.save();

    await Reward.create({
      user: user._id,
      waste: waste._id,
      points,
      reason: `${waste.wasteType} Recycling`,
    });

    await Notification.create({
      user: user._id,
      title: "Reward Earned",
      message: `Congratulations! You earned ${points} reward points for recycling ${waste.wasteType}.`,
      type: "success",
    });

    res.status(200).json({
      success: true,
      message: "Waste approved and reward points awarded successfully.",
      pointsAwarded: points,
      waste,
    });
  } catch (error) {
    console.log("APPROVE WASTE ERROR:", error);

    res.status(500).json({
      message: "Failed to approve waste",
      error: error.message,
    });
  }
};

module.exports = {
  createWaste,
  getUserWaste,
  getAllWaste,
  updateWasteStatus,
  getNotifications,
  approveWaste,
};
