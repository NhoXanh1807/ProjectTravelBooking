import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setTimeout(() => {
      navigate('/login');
    }, 1000);
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
