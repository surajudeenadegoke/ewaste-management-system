import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Notifications.css";
import API_URL from "../config";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
<Navbar />
    <div className="notification-container">
      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((item) => (
          <div className="notification-card" key={item._id}>
            <h3>{item.title || "Notification"}</h3>

            <p>{item.message}</p>

            <small>{new Date(item.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
    </>
  );
}

export default Notifications;
