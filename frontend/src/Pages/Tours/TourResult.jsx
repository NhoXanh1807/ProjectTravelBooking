import SearchMore from "../../shared/Searched-bar/search_more";
import Tourbar from "../../shared/mostsearched/tourbar";
import React, { useState } from 'react';
import './TourResult.css'
import TravelerHeaderTour from "../../Components/Headers/TravelerHeader/TravelerHeader_tour";
import GuestHeaderTour from "../../Components/Headers/GuestHeader/GuestHeader_tour";
import { BASE_URL } from "./../../utils/config"; 
import useFetch from "./../../hooks/useFetch";

function TourResult({ isLoggedIn, setIsLoggedIn }) {
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
        <div className="tourresult">
            {isLoggedIn ? (
                <TravelerHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            ) : (
                <GuestHeaderTour  isLoggedIn={isLoggedIn} handleClick={handleClick} />
            )}
            <h1>Tours Results</h1>
            <div className="tourBars">
                {loading ? (
                    <p>Loading...</p>  // Hiển thị khi đang tải
                ) : error ? (
                    <p>{error}</p>  // Hiển thị lỗi nếu có
                ) : (
                    tours.length > 0 ? (
                        tours.map((tour) => (
                            <Tourbar
                                key={tour._id}
                                item={tour}
                                onClick={() => handleItemClick(tour)}
                                isLoggedIn={isLoggedIn} // Truyền isLoggedIn vào Tourbar
                                setIsLoggedIn={setIsLoggedIn} // Truyền setIsLoggedIn vào Tourbar
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
                            className={`pagination-button ${
                                page === pageIndex + 1 ? "active" : ""
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

export default TourResult;
