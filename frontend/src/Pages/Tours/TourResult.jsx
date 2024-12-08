import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchMore from "../../shared/Searched-bar/search_more";
import Tourbar from "../../shared/mostsearched/tourbar";
import ToursDetail from '../../Pages/Tours/ToursDetail';
import TravelerHeaderTour from "../../Components/Headers/TravelerHeader/TravelerHeader_tour";
import GuestHeaderTour from "../../Components/Headers/GuestHeader/GuestHeader_tour";
import './Tours.css';

function TourResult({ isLoggedIn, setIsLoggedIn }) {
    const [selectedTour, setSelectedTour] = useState(null);
    const location = useLocation();
    const [tourData, setTourData] = useState([]);

    // Lấy dữ liệu tour từ state khi chuyển hướng từ SearchBar/SearchMore
    useEffect(() => {
        if (location.state && location.state.results) {
            setTourData(location.state.results);  // Dữ liệu từ state được truyền vào
        }
    }, [location.state]);

    const handleItemClick = (tour) => {
        setSelectedTour(tour);
    };

    const handleClick = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="tourResult">
            {isLoggedIn ? (
                <TravelerHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            ) : (
                <GuestHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            )}

            {/* Khu vực kết quả tìm kiếm các tour */}
            <div className="tourBars">
                {tourData.length > 0 ? (
                    tourData.map((tour) => (
                        <Tourbar
                            key={tour._id}
                            item={tour}
                            onClick={() => handleItemClick(tour)}
                        />
                    ))
                ) : (
                    <p>Không có tour nào phù hợp với yêu cầu của bạn.</p>
                )}
            </div>

            {/* Hiển thị chi tiết tour khi người dùng chọn */}
            {selectedTour && (
                <div className="tourDetail">
                    <ToursDetail tour={selectedTour} />
                </div>
            )}
        </div>
    );
}

export default TourResult;
