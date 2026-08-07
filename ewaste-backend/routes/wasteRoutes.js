const express = require("express");

const {
  createWaste,
  getUserWaste,
  getAllWaste,
  updateWasteStatus,
  approveWaste,
} = require("../controllers/wasteController");

const { protect } = require("../middleware/authMiddleware");

const {isAdmin} = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createWaste);

router.get("/my", protect, getUserWaste);

// ADMIN ROUTES
router.get("/all", protect, isAdmin, getAllWaste);

router.put("/:id", protect, isAdmin, updateWasteStatus);
router.put("/:id/approve", protect, isAdmin, approveWaste);

module.exports = router;
