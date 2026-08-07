const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {isAdmin} = require("../middleware/adminMiddleware");

console.log({
  protect: typeof protect,
  isAdmin: typeof isAdmin,
  getAllUsers: typeof getAllUsers,
});

router.get("/", protect, isAdmin, getAllUsers);

module.exports = router;