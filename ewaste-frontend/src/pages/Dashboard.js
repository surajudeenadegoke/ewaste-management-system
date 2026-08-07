import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [wastes, setWastes] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5001/api/waste/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWastes(res.data?.wastes || []);
        setPoints(res.data?.points||0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <div className="top-bar">
        <h2>Total Points: {points}</h2>

        <Link to="/submit-waste">Submit E-Waste</Link>
      </div>

      <h2>Waste History</h2>

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
          {wastes.length === 0 ? (
            <tr>
              <td colSpan="5">No waste submitted yet</td>
            </tr>
          ) : (
            wastes.map((waste) => (
              <tr key={waste._id}>
                <td>{waste.wasteType}</td>
                <td>{waste.quantity}</td>
                <td>{waste.location}</td>
                <td>{new Date(waste.pickupDate).toLocaleDateString()}</td>
                <td>{waste.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
