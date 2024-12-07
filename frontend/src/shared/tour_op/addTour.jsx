import React, { useState } from "react";
import tourData from "../../assets/data/tour";
import './addTour.css';

function AddTour({ selectedTourId, onCancel }) {
    // Find the selected tour
    const selectedTour = tourData.find((tour) => tour._id === selectedTourId);

    // Initialize form data with selected tour's data
    const [formData, setFormData] = useState({
        name: selectedTour?.TourName || "",
        price: selectedTour?.Price || "",
        fromDate: selectedTour?.StartDate?.toISOString().split("T")[0] || "",
        toDate: selectedTour?.EndDate?.toISOString().split("T")[0] || "",
        locations: selectedTour?.Locations.join(", ") || "",
        languages: selectedTour?.LanguageOffers.join(", ") || "",
        cancelPolicy: selectedTour?.CancellationPolicy || "",
        desc: selectedTour?.Description || "",
        type: selectedTour?.Type || "",
        capacity: selectedTour?.Capacity || "",
        status: selectedTour?.TourStatus || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update the selected tour data in tourData
        const updatedTourData = tourData.map((tour) =>
            tour._id === selectedTourId
                ? {
                    ...tour,
                    TourName: formData.name,
                    Price: parseFloat(formData.price),
                    StartDate: new Date(formData.fromDate),
                    EndDate: new Date(formData.toDate),
                    Locations: formData.locations.split(",").map((loc) => loc.trim()),
                    LanguageOffers: formData.languages.split(",").map((lang) => lang.trim()),
                    CancellationPolicy: formData.cancelPolicy,
                    Description: formData.desc,
                    Type: formData.type,
                    Capacity: parseInt(formData.capacity, 10),
                    TourStatus: formData.status,
                }
                : tour
        );

        console.log("Tour data updated:", updatedTourData);
    };

    return (
        <div className="addTour">
            <form className="addTour-content" onSubmit={handleSubmit}>
                <div className="addTour-name">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="input-name"
                        placeholder="Tour Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-price">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        className="input-price"
                        placeholder="Tour Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <label>VND</label>
                </div>
                <div className="addTour-fromDate">
                    <label>From Date:</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-toDate">
                    <label>To Date:</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-locations">
                    <label>Locations:</label>
                    <input
                        type="text"
                        name="locations"
                        placeholder="Comma-separated locations"
                        value={formData.locations}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-languages">
                    <label>Languages Offers:</label>
                    <input
                        type="text"
                        name="languages"
                        placeholder="Comma-separated languages"
                        value={formData.languages}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-cancelPolicy">
                    <label>Cancellation Policy:</label>
                    <textarea
                        name="cancelPolicy"
                        placeholder="Cancellation Policy"
                        value={formData.cancelPolicy}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-desc">
                    <label>Description:</label>
                    <textarea
                        name="desc"
                        placeholder="Tour Description"
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-type">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        placeholder="Tour Type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="addTour-capacity">
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        placeholder="Tour Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                    <label>Seats</label>
                </div>
                <div className="addTour-status">
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold Out">Sold Out</option>
                    </select>
                </div>
                <div className="form-conclusion">
                    <div className="form-conclusion__content">
                        Add this tour?
                    </div>
                    <div className="form-conclusion__btns">
                        <button type="submit" className="addTour-save">
                            Save
                        </button>
                        <button
                            type="button"
                            className="addTour-cancel"
                            onClick={onCancel} // Calling onCancel function from parent
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTour;
