import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./UserDashboard.css";
import API_URL from "../config";

function UserDashboard() {
  const [wastes, setWastes] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/api/waste/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWastes(res.data.wastes || []);
        setPoints(res.data.rewardPoints || 0);
      } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingCount = wastes.filter(
    (waste) => waste.status?.toLowerCase() === "pending"
  ).length;

  const collectedCount = wastes.filter(
    (waste) => waste.status?.toLowerCase() === "collected"
  ).length;

  return (
    <>
      <Navbar />

      <div className="user-dashboard">
        <div className="welcome-section">
          <div>
            <h1>My Dashboard</h1>
            <p>Track your e-waste recycling activities and rewards.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <div>
              <p>Reward Points</p>
              <h2>{points}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div>
              <p>Total Requests</p>
              <h2>{wastes.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <div>
              <p>Pending</p>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">♻️</span>
            <div>
              <p>Collected</p>
              <h2>{collectedCount}</h2>
            </div>
          </div>
        </div>

        <div className="requests-card">
          <div className="requests-header">
            <div>
              <h2>My Waste Requests</h2>
              <p>Recent electronic waste submissions</p>
            </div>
          </div>

          {loading ? (
            <p className="loading">Loading...</p>
          ) : wastes.length === 0 ? (
            <div className="empty-state">
              <h3>No waste requests yet</h3>
              <p>Submit your first electronic waste request to get started.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="waste-table">
                <thead>
                  <tr>
                    <th>Waste Type</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Pickup Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {wastes.map((waste) => (
                    <tr key={waste._id}>
                      <td>{waste.wasteType}</td>
                      <td>{waste.quantity}</td>
                      <td>{waste.location}</td>
                      <td>
                        {new Date(
                          waste.pickupDate
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`status ${waste.status?.toLowerCase()}`}
                        >
                          {waste.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;