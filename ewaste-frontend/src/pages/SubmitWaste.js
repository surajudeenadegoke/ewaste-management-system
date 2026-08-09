import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./SubmitWaste.css";
import API_URL from "../config";

function SubmitWaste() {
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState(null);
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    location: "",
    pickupDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/waste`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessData({
        pointsEarned: res.data.pointsEarned,
        totalPoints: res.data.totalPoints,
      });

      setFormData({
        wasteType: "",
        quantity: "",
        location: "",
        pickupDate: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Submission failed"
      );
    }
  };

  return (
    <>
<Navbar />
    <div className="submit-container">
      <div className="submit-card">
        <h1>♻️ Submit E-Waste</h1>

        <p className="subtitle">
          Schedule pickup for your electronic waste and earn reward points.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="wasteType"
            placeholder="Waste Type (Laptop, Phone...)"
            value={formData.wasteType}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Pickup Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Pickup Date</label>

          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Waste</button>
        </form>
        {successData && (
          <div className="modal">
            <div className="modal-content">
              <h2>♻️ Waste Submitted Successfully</h2>

              <p>Points Earned: {successData.pointsEarned}</p>

              <p>Total Points: {successData.totalPoints}</p>

              <button onClick={() => navigate("/my-waste")}>
                View My Requests
              </button>

              <button onClick={() => setSuccessData(null)}>
                Submit Another Waste
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default SubmitWaste;
