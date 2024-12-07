import OperatorHeader from '../../Components/Headers/OperatorHeader/OperatorHeader';
import SearchMore from '../../shared/Searched-bar/search_more';
import './TourOperator.css';
import Tourbartwo from '../../shared/mostsearched/tourbar_two';
import tourData from '../../assets/data/tour';
import React, { useState } from 'react';
import ModifyTour from '../../shared/tour_op/modifyTour';
import AddTour from '../../shared/tour_op/addTour';

function TourOperator({ isLoggedIn, setIsLoggedIn }) {
    const [selectedTour, setSelectedTour] = useState(null); // Tour được chọn
    const [showAddTour, setShowAddTour] = useState(false); // Hiện form AddTour
    const [showModifyTour, setShowModifyTour] = useState(false); // Hiện form ModifyTour

    // Xử lý khi click vào một tour
    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        setShowModifyTour(true); // Hiện ModifyTour khi chọn tour
        setShowAddTour(false);   // Ẩn AddTour nếu đang hiển thị
    };

    // Xử lý khi click vào nút "Add New Tour"
    const handleAddNewClick = () => {
        setShowAddTour(true);    // Hiện AddTour
        setShowModifyTour(false); // Ẩn ModifyTour nếu đang hiển thị
        setSelectedTour(null);  // Đặt lại tour được chọn
    };

    // Xử lý khi hủy AddTour
    const handleCancelAdd = () => {
        setShowAddTour(false); // Ẩn AddTour
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
                            {/* Danh sách các tour */}
                            {tourData.map((tour) => (
                                <Tourbartwo
                                    key={tour._id}
                                    item={tour}
                                    onClick={() => handleItemClick(tour)}
                                    className="Tourbartwo"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourOperator;
