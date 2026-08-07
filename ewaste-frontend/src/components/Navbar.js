import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/my-waste">♻️ My Waste</Link>

        <Link to="/submit-waste">➕ Submit Waste</Link>

        <Link to="/notifications">🔔 Notifications</Link>
      </div>

      <Logout />
    </nav>
  );
}

export default Navbar;
