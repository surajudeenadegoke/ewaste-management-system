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

        setWastes(res.data.wastes);
        setPoints(res.data.rewardPoints);
      } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="user-dashboard">
        <div className="dashboard-header">
          <h1>♻️ E-Waste Management System</h1>
          <h2>My Points: {points}</h2>
          <p>Manage your electronic waste submissions</p>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : wastes.length === 0 ? (
          <p className="empty">No waste submitted yet</p>
        ) : (
          <table>
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
                  <td>{new Date(waste.pickupDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${waste.status}`}>
                      {waste.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
