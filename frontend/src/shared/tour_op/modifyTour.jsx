import React, { useState } from "react";
import tourData from "../../assets/data/tour";
import "./modifyTour.css";

function ModifyTour({ selectedTourId, onCancel }) {
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
    const handleCancel = () => {
        if (onCancel) onCancel(); // Gọi callback khi nhấn nút Cancel
    };
    return (
        <div className="modifyTour">
            <form className="modifyTour-content" onSubmit={handleSubmit}>
                <div className="modifyTour-name">
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
                <div className="modifyTour-price">
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
                <div className="modifyTour-fromDate">
                    <label>From Date:</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-toDate">
                    <label>To Date:</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-locations">
                    <label>Locations:</label>
                    <input
                        type="text"
                        name="locations"
                        placeholder="Comma-separated locations"
                        value={formData.locations}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-languages">
                    <label>Languages Offers:</label>
                    <input
                        type="text"
                        name="languages"
                        placeholder="Comma-separated languages"
                        value={formData.languages}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-cancelPolicy">
                    <label>Cancellation Policy:</label>
                    <textarea
                        name="cancelPolicy"
                        placeholder="Cancellation Policy"
                        value={formData.cancelPolicy}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-desc">
                    <label>Description:</label>
                    <textarea
                        name="desc"
                        placeholder="Tour Description"
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-type">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        placeholder="Tour Type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="modifyTour-capacity">
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
                <div className="modifyTour-status">
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
                        Confirm to update?
                    </div>
                    <div className="form-conclusion__btns">
                        <button type="submit" className="modifyTour-save">
                            Save
                        </button>
                        <button
                        type="button"
                        className="modifyTour-cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default ModifyTour;
