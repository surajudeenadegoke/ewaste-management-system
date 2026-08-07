const Waste = require("../models/wasteModel");
const User = require("../models/userModel");

// GET ALL WASTE REQUESTS
const getAllWaste = async (req, res) => {
  try {
    const wastes = await Waste.find().populate("user", "name email");
    res.json(wastes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS
const updateWasteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated",
      waste,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get dashboard stats

const getAdminStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalWaste = await Waste.countDocuments();

    const pending = await Waste.countDocuments({
      status: "pending",
    });

    const approved = await Waste.countDocuments({
      status: "approved",
    });

    const collected = await Waste.countDocuments({
      status: "collected",
    });

    res.json({
      totalUsers,
      totalWaste,
      pending,
      approved,
      collected,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};


module.exports = {
    getAdminStats,updateWasteStatus,updateWasteStatus,getAllWaste
};