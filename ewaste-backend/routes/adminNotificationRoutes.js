const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {isAdmin} = require("../middleware/adminMiddleware");

const {
  getAllNotifications,
} = require("../controllers/adminNotificationController");
console.log({
  protect: typeof protect,
  isAdmin: typeof isAdmin,
  getAllNotifications: typeof getAllNotifications,
});

router.get("/", protect, isAdmin, getAllNotifications);

module.exports = router;
