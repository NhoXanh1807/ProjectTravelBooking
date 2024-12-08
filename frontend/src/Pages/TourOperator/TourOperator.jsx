import OperatorHeader from '../../Components/Headers/OperatorHeader/OperatorHeader';
import SearchMore from '../../shared/Searched-bar/search_more';
import './TourOperator.css';
import Tourbartwo from '../../shared/mostsearched/tourbar_two';
import React, { useState } from 'react';
import ModifyTour from '../../shared/tour_op/modifyTour';
import AddTour from '../../shared/tour_op/addTour';
import { BASE_URL } from "../../utils/config"; 
import  useFetch  from "../../hooks/useFetch"; // Import useFetch hook

function TourOperator({ isLoggedIn, setIsLoggedIn }) {
    const [selectedTour, setSelectedTour] = useState(null); // Tour được chọn
    const [showAddTour, setShowAddTour] = useState(false); // Hiện form AddTour
    const [showModifyTour, setShowModifyTour] = useState(false); // Hiện form ModifyTour
    const { data: tours, error, loading } = useFetch(`${BASE_URL}/tours?page=0`); // Fetch tour data từ API

    // Xử lý khi click vào một tour
    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        setShowModifyTour(true); // Hiện ModifyTour khi chọn tour
        setShowAddTour(false);   // Ẩn AddTour nếu đang hiển thị
    };

    // Xử lý khi click vào nút "Add New Tour"
    const handleAddNewClick = () => {
        setShowAddTour(true);
        setShowModifyTour(false);
        setSelectedTour(null);
      };

    // Xử lý khi hủy AddTour
    const handleCancelAdd = () => {
        setShowAddTour(false); // Ẩn form AddTour khi Cancel
      };

    // Xử lý khi hủy ModifyTour
    const handleCancelModify = () => {
        setShowModifyTour(false); // Ẩn ModifyTour
    };

    return (
        <div className="touroperator">
            <OperatorHeader />
            <div className="touroperator-main">
                <div className="touroperator-main__header">
                    <h2>All tours</h2>
                    <button className="addNew" onClick={handleAddNewClick}>
                        <i className="fa-solid fa-plus"></i> Add new tour
                    </button>
                </div>
                <div className="touroperator-main__content">
                    <SearchMore style={{ backgroundColor: 'transparent' }} />
                    <div className="touroperator-main__tours">
                        <div className="tourBars">
                            {/* Hiển thị AddTour hoặc ModifyTour */}
                            {showAddTour && !showModifyTour && <AddTour selectedTourId={selectedTour?._id} onCancel={handleCancelAdd} />}
                            {showModifyTour && !showAddTour && selectedTour && (
                                <ModifyTour
                                    selectedTourId={selectedTour._id}
                                    onCancel={handleCancelModify}
                                />
                            )}

                            {/* Hiển thị danh sách tour */}
                            {loading ? (
                                <p>Loading...</p> // Hiển thị khi dữ liệu đang được tải
                            ) : error ? (
                                <p>{error}</p> // Hiển thị lỗi nếu có
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
                                    <p>No tours available.</p> // Nếu không có tour nào
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourOperator;
