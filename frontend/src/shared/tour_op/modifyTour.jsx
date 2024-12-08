import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import "./modifyTour.css";

function ModifyTour({ selectedTourId, onCancel }) {
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tour details when component loads
    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours/${selectedTourId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch tour details");
                }
                const tour = await response.json();
                const formattedData = {
                    name: tour.TourName || "",
                    price: tour.Price || "",
                    fromDate: tour.StartDate?.split("T")[0] || "",
                    toDate: tour.EndDate?.split("T")[0] || "",
                    locations: tour.Locations?.join(", ") || "",
                    languages: tour.LanguageOffers?.join(", ") || "",
                    cancelPolicy: tour.CancellationPolicy || "",
                    desc: tour.Description || "",
                    type: tour.Type || "",
                    capacity: tour.Capacity || "",
                    status: tour.TourStatus || "",
                };
                setFormData(formattedData);
                setOriginalData(formattedData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTourDetails();
    }, [selectedTourId]);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Only include fields that are different from the original data
        const updatedData = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== originalData[key]) {
                updatedData[key] = formData[key];
            }
        });

        if (Object.keys(updatedData).length === 0) {
            alert("No changes to save!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/tours/${selectedTourId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TourName: updatedData.name,
                    Price: updatedData.price ? parseFloat(updatedData.price) : undefined,
                    StartDate: updatedData.fromDate,
                    EndDate: updatedData.toDate,
                    Locations: updatedData.locations
                        ? updatedData.locations.split(",").map((loc) => loc.trim())
                        : undefined,
                    LanguageOffers: updatedData.languages
                        ? updatedData.languages.split(",").map((lang) => lang.trim())
                        : undefined,
                    CancellationPolicy: updatedData.cancelPolicy,
                    Description: updatedData.desc,
                    Type: updatedData.type,
                    Capacity: updatedData.capacity
                        ? parseInt(updatedData.capacity, 10)
                        : undefined,
                    TourStatus: updatedData.status,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update tour");
            }

            alert("Tour updated successfully!");
            onCancel(); // Close the form after successful update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modifyTour">
            <form className="modifyTour-content" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="modifyTour-name">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tour Name"
                    />
                </div>
                <div className="modifyTour-price">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Tour Price"
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
                        value={formData.locations}
                        onChange={handleChange}
                        placeholder="Comma-separated locations"
                    />
                </div>
                <div className="modifyTour-languages">
                    <label>Languages Offers:</label>
                    <input
                        type="text"
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        placeholder="Comma-separated languages"
                    />
                </div>
                <div className="modifyTour-cancelPolicy">
                    <label>Cancellation Policy:</label>
                    <textarea
                        name="cancelPolicy"
                        value={formData.cancelPolicy}
                        onChange={handleChange}
                        placeholder="Cancellation Policy"
                    />
                </div>
                <div className="modifyTour-desc">
                    <label>Description:</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Tour Description"
                    />
                </div>
                <div className="modifyTour-type">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Tour Type"
                    />
                </div>
                <div className="modifyTour-capacity">
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Tour Capacity"
                    />
                    <label>Seats</label>
                </div>
                <div className="modifyTour-status">
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="" disabled>Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold Out">Sold Out</option>
                    </select>
                </div>
                <div className="form-conclusion">
                    <button type="submit" disabled={loading} className="modifyTour-save">
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="modifyTour-cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ModifyTour;
