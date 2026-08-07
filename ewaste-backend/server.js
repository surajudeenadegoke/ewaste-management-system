const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoute = require("./routes/notificationRoute");
const rewardRoutes = require("./routes/rewardRoutes");
const userRoutes = require("./routes/userRoutes");
const adminNotificationRoutes = require("./routes/adminNotificationRoutes");

// Load env variables
dotenv.config({ quiet: true });

// Connect database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoute);
app.use("/api/rewards", rewardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/notifications", adminNotificationRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("E-Waste Recycling API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  (callback = () => {
    console.log(`Server running on port ${PORT}`);
  })
);
