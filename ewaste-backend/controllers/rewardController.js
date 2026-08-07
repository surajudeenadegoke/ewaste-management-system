const Reward = require("../models/rewardModel");
const Redemption = require("../models/redemptionModel");
const User = require("../models/userModel");



/*const getRewardBalance = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        res.status(200).json({
            rewardPoints: user.rewardPoints
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
*/

const getRewardBalance = async (req, res) => {
  try {
    res.status(200).json({
      rewardPoints: req.user.rewardPoints || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRewardHistory = async (req, res) => {

    try {

        const rewards = await Reward.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(rewards);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const redeemReward = async (req, res) => {

    try {

        const { rewardType, points } = req.body;

        const user = await User.findById(req.user._id);

        if (user.rewardPoints < points) {

            return res.status(400).json({
                message: "Insufficient reward points."
            });

        }

        user.rewardPoints -= points;

        await user.save();

        const redemption = await Redemption.create({

            user: user._id,

            rewardType,

            pointsRedeemed: points,

            status: "Pending"

        });

        res.status(201).json(redemption);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getRewardBalance,

    getRewardHistory,

    redeemReward

};