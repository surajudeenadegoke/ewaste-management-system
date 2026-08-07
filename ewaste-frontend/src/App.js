import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import SubmitWaste from "./pages/SubmitWaste.js";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectRoute";
import Users from "./pages/Users";
import AdminNotifications from "./pages/AdminNotifications";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}

        <Route
          path="/submit-waste"
          element={
            <ProtectedRoute>
              <SubmitWaste />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-waste"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
    path="/admin-notifications"
    element={
        <ProtectedRoute role="admin">
            <AdminNotifications/>
        </ProtectedRoute>
    }
/>
<Route
  path="/admin-reports"
  element={
    <ProtectedRoute role="admin">
      <AdminReports />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
