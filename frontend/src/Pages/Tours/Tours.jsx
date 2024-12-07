import SearchMore from "../../shared/Searched-bar/search_more";
import Tourbar from "../../shared/mostsearched/tourbar";
import React, { useState } from 'react';
import './Tours.css'
import TravelerHeaderTour from "../../Components/Headers/TravelerHeader/TravelerHeader_tour";
import GuestHeaderTour from "../../Components/Headers/GuestHeader/GuestHeader_tour";
import { BASE_URL } from "./../../utils/config"; 
import  useFetch  from "./../../hooks/useFetch";

function Tours({ isLoggedIn, setIsLoggedIn }) {
    const [page, setPage] = useState(0);  // State lưu trang hiện tại
    const { data: tours, error, loading } = useFetch(`${BASE_URL}/tours?page=${page}`); // Gọi API với phân trang

    const [selectedTour, setSelectedTour] = useState(null);

    const handleItemClick = (tour) => {
        setSelectedTour(tour);
    };

    const handleClick = () => {
        setIsLoggedIn(false);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1); // Tăng trang khi nhấn "Load more"
    };

    return (
        <div className="alltours">
            {isLoggedIn ? (
                <TravelerHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            ) : (
                <GuestHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            )}

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
                            />
                        ))
                    ) : (
                        <p>No tours available.</p>  // Nếu không có tour nào
                    )
                )}
            </div>

            {tours.length > 0 && (
                <button className="load-more" onClick={handleLoadMore}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default Tours;
