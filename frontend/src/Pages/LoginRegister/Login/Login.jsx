import React, { useState, useContext } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";
import { BASE_URL } from "./../../../utils/config"; // BASE_URL nên trỏ tới địa chỉ backend của bạn

function Login() {
  const [formData, setFormData] = useState({
    Email: "", // Đồng bộ với backend
    Password: "", // Đồng bộ với backend
  });
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext); // Lấy dispatch từ AuthContext
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Quản lý lỗi hiển thị

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ trước khi gửi yêu cầu

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Để cookie được gửi kèm
      });

      const data = await response.json();
      if (response.ok) {
        // Đăng nhập thành công
        dispatch({ type: "LOGIN_SUCCESS", payload: data.data }); // Lưu thông tin người dùng vào AuthContext
        navigate("/home"); // Điều hướng đến trang chủ
      } else {
        // Đăng nhập thất bại
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    }
  };

  // Xử lý hiển thị/ẩn mật khẩu
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
                name="Email" // Đồng bộ với backend
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="Password" // Đồng bộ với backend
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="error">{error}</p>} {/* Hiển thị lỗi */}
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
