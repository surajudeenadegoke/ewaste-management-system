import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="hero-section">
          <h1>♻️ E-Waste Recycling App</h1>

          <p className="intro-text">
            Welcome to the E-Waste Recycling App — an intelligent digital
            platform designed to help individuals and organizations properly
            dispose of electronic waste in an environmentally friendly manner.
          </p>

          <div className="features">
            <div className="feature-card">
              <h3>📦 Waste Submission</h3>
              <p>
                Submit electronic waste such as phones, laptops, batteries,
                televisions, cables, and more for safe disposal.
              </p>
            </div>

            <div className="feature-card">
              <h3>🚚 Pickup Scheduling</h3>
              <p>
                Schedule pickup dates and track the progress of your waste
                collection process.
              </p>
            </div>

            <div className="feature-card">
              <h3>🏆 Reward Points</h3>
              <p>
                Earn reward points for every electronic waste submission and
                encourage sustainable recycling.
              </p>
            </div>

            <div className="feature-card">
              <h3>🌍 Environmental Protection</h3>
              <p>
                Contribute to a cleaner environment and reduce pollution caused
                by improper disposal of electronic waste.
              </p>
            </div>
          </div>

          <div className="home-buttons">
            <Link to="/login" className="btn login-btn">
              Login
            </Link>

            <Link to="/register" className="btn register-btn">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
