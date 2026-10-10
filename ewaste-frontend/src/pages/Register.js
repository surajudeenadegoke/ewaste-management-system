import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import API_URL from "../config";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        { timeout: 15000 },
      );

      console.log("Registration response:", response.status);

      setMessage("Registration successful! Redirecting to login...");
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (error.code === "ECONNABORTED"
          ? "The server took too long to respond. Check whether your account was created before trying again."
          : error.response
            ? "Registration failed. Please check your details."
            : "Unable to confirm registration. Check your connection or try logging in before registering again.");

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        {message && (
          <div
            role={messageType === "error" ? "alert" : "status"}
            style={{
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "6px",
              backgroundColor:
                messageType === "success" ? "#e8f5e9" : "#ffebee",
              color: messageType === "success" ? "#1b5e20" : "#b71c1c",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
