const express = require("express");
const {
  getAllWaste,
  updateWasteStatus,
  getAdminStats,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Only admin can access
router.get("/waste", protect, isAdmin, getAllWaste);
router.put("/waste/:id", protect, isAdmin, updateWasteStatus);
router.get("/stats", protect, isAdmin, getAdminStats);

module.exports = router;
