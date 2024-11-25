import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form handling logic here
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
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
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? (<FaEye/>) : (<FaEyeSlash/>)}
              </span>
            </div>
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
