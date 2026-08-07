const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = { isAdmin };
