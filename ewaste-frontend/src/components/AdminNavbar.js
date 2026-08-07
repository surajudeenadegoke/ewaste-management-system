import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./AdminNavbar.css";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">♻️ E-Waste Admin</div>

      <div className="admin-links">
        <Link to="/admin">🏠 Dashboard</Link>

        <Link to="/admin-users">👥 Users</Link>

        <Link to="/admin-notifications">🔔 Notifications</Link>

        <Link to="/admin-reports">📊 Reports</Link>
      </div>

      <Logout />
    </nav>
  );
}

export default AdminNavbar;