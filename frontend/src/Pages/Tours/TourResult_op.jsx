import SearchMore from "../../shared/Searched-bar/search_more";
import Tourbartwo from "../../shared/mostsearched/tourbar_two";
import React, { useState } from 'react';
import './TourResult_op.css'
import { BASE_URL } from "./../../utils/config";
import useFetch from "./../../hooks/useFetch";
import OperatorHeader from "../../Components/Headers/OperatorHeader/OperatorHeader";
function TourResultOperator({ isLoggedIn, setIsLoggedIn }) {
    const [page, setPage] = useState(0);  // Start page at 1 for pagination
    const itemsPerPage = 10; //  // State lưu trang hiện tại
    const { data: tours, error, loading } = useFetch(`${BASE_URL}/tours?page=${page}`); // Gọi API với phân trang

    const [selectedTour, setSelectedTour] = useState(null);
    const [totalTours, setTotalTours] = useState(0); // Total number of tours from API

    // New state for selectedTour
    const handleItemClick = (tour) => {
        setSelectedTour(tour);
    };

    const handleClick = () => {
        setIsLoggedIn(false);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1); // Tăng trang khi nhấn "Load more"
    };
    const totalPages = Math.ceil(totalTours / itemsPerPage); // Calculate total pages dynamically

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1); // Decrease page when "Previous" is clicked
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1); // Increase page when "Next" is clicked
        }
    };

    return (
        <div className="tourresultop">
            <div className="tourresltop-header"><OperatorHeader /></div>
            <h1>Tours Results</h1>
            <div className="tourBars">
                {loading ? (
                    <p>Loading...</p>  // Hiển thị khi đang tải
                ) : error ? (
                    <p>{error}</p>  // Hiển thị lỗi nếu có
                ) : (
                    tours.length > 0 ? (
                        tours.map((tour) => (
                            <Tourbartwo
                                key={tour._id}
                                item={tour}
                                onClick={() => handleItemClick(tour)}
                                className="Tourbartwo"
                            />
                        ))
                    ) : (
                        <p>No tours available.</p>  // Nếu không có tour nào
                    )
                )}
            </div>

            {tours.length > 0 && (
                <div className="pagination-controls">
                    <button
                        onClick={goToPreviousPage}
                        disabled={page === 1}
                        className="pagination-button-notpage"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, pageIndex) => (
                        <button
                            key={pageIndex + 1}
                            onClick={() => setPage(pageIndex + 1)}
                            className={`pagination-button ${page === pageIndex + 1 ? "active" : ""
                                }`}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}
                    <button
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                        className="pagination-button-notpage"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default TourResultOperator;
