import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import API_URL from "../config";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

    localStorage.setItem(
  "token",
  res.data.token
);


localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);


alert("Login successful");


if (res.data.user.role === "admin") {

  navigate("/admin");

} else {

  navigate("/my-waste");

}
console.log(res.data);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
    
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🔐 Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;