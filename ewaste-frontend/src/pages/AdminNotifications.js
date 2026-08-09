import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminNotifications.css";
import API_URL from "../config";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/admin/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data);
    } catch (error) {
      console.log(error);

      alert("Unable to load notifications.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="notification-page">
        <h1>🔔 System Notifications</h1>

        {notifications.map((note) => (
          <div className="notification-card" key={note._id}>
            <h3>{note.user?.name}</h3>

            <p>{note.message}</p>

            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminNotifications;
