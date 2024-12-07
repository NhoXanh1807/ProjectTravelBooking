import React, { useState, useContext } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";
import { jwtDecode } from "jwt-decode"; // Thư viện để giải mã JWT
import { BASE_URL } from "./../../../utils/config"; 

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Để gửi cookie
      });

      const data = await response.json();
      if (response.ok) {
        // Giải mã token để lấy role
        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.role;
        
        // Save the user and token in localStorage
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);

        // Dispatch login action
        dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
        setIsLoggedIn(true);

        // Điều hướng dựa trên role
        if (userRole === "operator") {
          navigate("/tour-operator");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-form">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="links">
              <p>
                Don’t have an account? <a href="/register">Register now!</a>
              </p>
              <p>
                Forgot password? <a href="/recovery">Recovery password!</a>
              </p>
            </div>
            <button type="submit" className="btn-primary">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
