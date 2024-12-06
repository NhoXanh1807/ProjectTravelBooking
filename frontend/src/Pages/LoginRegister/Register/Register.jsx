import React, { useState, useContext } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../../context/AuthContext'; 
import { BASE_URL } from './../../../utils/config'; // Đảm bảo BASE_URL được khai báo đúng

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    gender: ''
  });
  const { dispatch } = useContext(AuthContext); // Để sử dụng dispatch từ context
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Bắt đầu yêu cầu đăng ký
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Username: formData.username,
          Email: formData.email,
          Password: formData.password,
          Phone: formData.phoneNumber,
          DateOfBirth: formData.dateOfBirth,
          Gender: formData.gender,
        })
      });

      const data = await response.json();
      
      if (data.success) {
        dispatch({ type: 'REGISTER_SUCCESS' });
        setTimeout(() => {
          navigate('/login'); // Điều hướng sau khi đăng ký thành công
        }, 1000);
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: data.message });
        alert(data.message); // Thông báo lỗi nếu có
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      alert('An error occurred, please try again!');
    }
  };

  return (
    <div className='register'>
      <div className="register-container">
        <div className="auth-box">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="date" name="dateOfBirth" placeholder="Date of birth" value={formData.dateOfBirth} onChange={handleChange} required />
              <input type="tel" name="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <input type="email" name="email" placeholder="Enter your email" className="full-width" value={formData.email} onChange={handleChange} required />
            <div className="gender-group">
              <label>
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="others" checked={formData.gender === 'others'} onChange={handleChange} required />
                Others
              </label>
            </div>
            <p>
              Already had an account? <a href="/login">Login now!</a>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
