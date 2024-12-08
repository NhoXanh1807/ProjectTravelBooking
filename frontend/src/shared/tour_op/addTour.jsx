import React, { useState, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import "./addTour.css"; // Tạo file CSS phù hợp

function AddTour() {
  const [formData, setFormData] = useState({
    TourName: "",
    TourStatus: "Available",
    AvailableSeats: "",
    Description: "",
    Price: "",
    Duration: "",
    Capacity: "",
    Locations: "",
    CancellationPolicy: "",
    Type: "",
    LanguageOffers: "",
    StartDate: "",
    EndDate: "",
  });

  const { user } = useContext(AuthContext); // Lấy thông tin user để xác thực
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (!token) {
      setError("You must log in to add a tour.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
        body: JSON.stringify({
          ...formData,
          Locations: formData.Locations.split(",").map((loc) => loc.trim()), // Chuyển danh sách địa điểm thành mảng
          LanguageOffers: formData.LanguageOffers.split(",").map((lang) => lang.trim()), // Chuyển danh sách ngôn ngữ thành mảng
          TourOperatorObjectID: user._id, // Gắn thông tin người tạo tour
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({
          TourName: "",
          TourStatus: "Available",
          AvailableSeats: "",
          Description: "",
          Price: "",
          Duration: "",
          Capacity: "",
          Locations: "",
          CancellationPolicy: "",
          Type: "",
          LanguageOffers: "",
          StartDate: "",
          EndDate: "",
        });
      } else {
        setError(data.message || "Failed to add tour. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("AddTour error:", err);
    }
  };

  return (
    <div className="add-tour">
      <h1>Add a New Tour</h1>
      <form onSubmit={handleSubmit} className="add-tour-form">
        <div className="input-group">
          <label>Tour Name</label>
          <input
            type="text"
            name="TourName"
            value={formData.TourName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Tour Status</label>
          <select
            name="TourStatus"
            value={formData.TourStatus}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="input-group">
          <label>Available Seats</label>
          <input
            type="number"
            name="AvailableSeats"
            value={formData.AvailableSeats}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Duration</label>
          <input
            type="text"
            name="Duration"
            value={formData.Duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Capacity</label>
          <input
            type="number"
            name="Capacity"
            value={formData.Capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Locations (comma-separated)</label>
          <input
            type="text"
            name="Locations"
            value={formData.Locations}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Cancellation Policy</label>
          <textarea
            name="CancellationPolicy"
            value={formData.CancellationPolicy}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-group">
          <label>Type</label>
          <input
            type="text"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Language Offers (comma-separated)</label>
          <input
            type="text"
            name="LanguageOffers"
            value={formData.LanguageOffers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Tour added successfully!</p>}
        <button type="submit" className="btn-primary">Add Tour</button>
      </form>
    </div>
  );
}

export default AddTour;
