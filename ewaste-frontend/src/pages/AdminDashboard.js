
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminDashboard.css";
import API_URL from "../config";

function AdminDashboard() {
  const [wastes, setWastes] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWaste: 0,
    pending: 0,
    approved: 0,
    collected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // FETCH ALL WASTE REQUESTS
  const fetchWaste = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/waste/all`,
        {
          headers: getAuthHeaders(),
        }
      );

      setWastes(
        Array.isArray(res.data) ? res.data : []
      );

      return true;
    } catch (error) {
      console.error("Waste fetch error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load waste requests."
      );

      return false;
    }
  };

  // FETCH DASHBOARD STATISTICS
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/stats`,
        {
          headers: getAuthHeaders(),
        }
      );

      setStats({
        totalUsers: res.data.totalUsers ?? 0,
        totalWaste: res.data.totalWaste ?? 0,
        pending: res.data.pending ?? 0,
        approved: res.data.approved ?? 0,
        collected: res.data.collected ?? 0,
      });

      return true;
    } catch (error) {
      console.error("Statistics error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load dashboard statistics."
      );

      return false;
    }
  };

  // LOAD DASHBOARD DATA
  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    await Promise.all([
      fetchWaste(),
      fetchStats(),
    ]);

    setLoading(false);
  };

  // APPROVE WASTE AND AWARD POINTS
  const approveWaste = async (id) => {
    if (processingId) return;

    try {
      setProcessingId(id);
      setError("");

      await axios.put(
        `${API_URL}/api/waste/${id}/approve`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      alert(
        "Waste approved successfully. Reward points awarded."
      );

      await Promise.all([
        fetchWaste(),
        fetchStats(),
      ]);

    } catch (error) {
      console.error("Approval error:", error);

      const message =
        error.response?.data?.message ||
        "Waste approval failed.";

      setError(message);
      alert(message);

    } finally {
      setProcessingId(null);
    }
  };

  // UPDATE WASTE STATUS TO COLLECTED
  const updateStatus = async (id, status) => {
    if (processingId) return;

    try {
      setProcessingId(id);
      setError("");

      await axios.put(
        `${API_URL}/api/waste/${id}`,
        { status },
        {
          headers: getAuthHeaders(),
        }
      );

      alert("Waste status updated successfully.");

      await Promise.all([
        fetchWaste(),
        fetchStats(),
      ]);

    } catch (error) {
      console.error("Status update error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to update waste status.";

      setError(message);
      alert(message);

    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="admin-container">
        <h1>♻️ Admin Dashboard</h1>

        {error && (
          <div
            role="alert"
            style={{
              background: "#ffebee",
              color: "#b71c1c",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        {loading && (
          <p>Loading dashboard information...</p>
        )}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>👥 Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="admin-stat-card">
            <h3>📦 Total Requests</h3>
            <p>{stats.totalWaste}</p>
          </div>

          <div className="admin-stat-card">
            <h3>⏳ Pending</h3>
            <p>{stats.pending}</p>
          </div>

          <div className="admin-stat-card">
            <h3>✅ Approved</h3>
            <p>{stats.approved}</p>
          </div>

          <div className="admin-stat-card">
            <h3>♻️ Collected</h3>
            <p>{stats.collected}</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Waste Type</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Pickup Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {wastes.map((waste) => (
                <tr key={waste._id}>
                  <td>{waste.user?.name || "N/A"}</td>

                  <td>{waste.user?.email || "N/A"}</td>

                  <td>{waste.wasteType}</td>

                  <td>{waste.quantity}</td>

                  <td>{waste.location}</td>

                  <td>
                    {waste.pickupDate
                      ? new Date(
                          waste.pickupDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <span
                      className={`status ${waste.status}`}
                    >
                      {waste.status}
                    </span>
                  </td>

                  <td>
                    {waste.status === "pending" && (
                      <button
                        className="approve-btn"
                        disabled={processingId !== null}
                        onClick={() =>
                          approveWaste(waste._id)
                        }
                      >
                        {processingId === waste._id
                          ? "Approving..."
                          : "Approve"}
                      </button>
                    )}

                    {waste.status === "approved" && (
                      <button
                        className="collect-btn"
                        disabled={processingId !== null}
                        onClick={() =>
                          updateStatus(
                            waste._id,
                            "collected"
                          )
                        }
                      >
                        {processingId === waste._id
                          ? "Updating..."
                          : "Collected"}
                      </button>
                    )}

                    {waste.status === "collected" && (
                      <span>Completed</span>
                    )}
                  </td>
                </tr>
              ))}

              {!loading && wastes.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    {error
                      ? "Unable to load waste requests."
                      : "No waste requests found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
