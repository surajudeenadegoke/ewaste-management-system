const express = require("express");

const router = express.Router();

const {

    getRewardBalance,

    getRewardHistory,

    redeemReward

} = require("../controllers/rewardController");

const {protect} = require("../middleware/authMiddleware");

router.get("/balance", protect, getRewardBalance);

router.get("/history", protect, getRewardHistory);

router.post("/redeem", protect, redeemReward);

module.exports = router;