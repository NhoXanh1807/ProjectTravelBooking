import { useState } from 'react';
import './tourbar_two.css';
import ModifyTour from '../../shared/tour_op/modifyTour'; // Import form ModifyTour

function Tourbartwo({ item, className }) {
    const [showConfirm, setShowConfirm] = useState(false); // Quản lý trạng thái hiển thị confirm
    const [isEditing, setIsEditing] = useState(false); // Trạng thái hiển thị form sửa đổi
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    const handleDeleteClick = () => {
        setShowConfirm(true); // Hiển thị confirmRemove
    };

    const handleCancelClick = () => {
        setShowConfirm(false); // Ẩn confirmRemove
    };

    const handleConfirmClick = () => {
        console.log('Tour deleted'); // Xử lý logic xóa tour
        setShowConfirm(false); // Ẩn confirmRemove sau khi xác nhận
    };

    const handleEditClick = () => {
        setIsEditing(true); // Mở form sửa đổi
    };

    const handleCancelEdit = () => {
        setIsEditing(false); // Đóng form sửa đổi
    };

    return (
        <div className={`tour-bar ${className}`}>
            <div className="tour-bar-header">
                <div className="tour-bar-headerName">{TourName}</div>
                <div className="tour-bar-headerPrice">{formattedPrice} VND</div>
            </div>
            <div className="tour-bar-content">
                <div className="tour-bar-contentTime">
                    <div className="tour-bar-contentStartDate">
                        <div>From:</div>
                        <div>{new Date(StartDate).toLocaleDateString()}</div>
                    </div>
                    <div className="tour-bar-contentEndDate">
                        <div>To:</div>
                        <div>{new Date(EndDate).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="tour-bar-contentLocation">
                    <div>Location: </div>
                    <div>{Locations.join(' > ')}</div>
                </div>
                <div className="tour-bar-contentLanguages">
                    <div>Languages offers:</div>
                    <div>{LanguageOffers.join(', ')}</div>
                </div>
            </div>
            <div className="tour-bar-foot">
                <div className="tour-bar-footStatus">{TourStatus}</div>
                <div className="tour-bar-foot__btn">
                    <button className="deleteTour" onClick={handleDeleteClick}>
                        <i className="fa-solid fa-circle-minus"></i>
                    </button>
                    <button className="modifyTour" onClick={handleEditClick}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>

            {/* Hiển thị form sửa đổi nếu isEditing = true */}
            {isEditing && (
                <div className="modify-tour-form">
                    <ModifyTour
                        selectedTourId={item._id}
                        onCancel={handleCancelEdit} // Truyền callback để ẩn form
                    />
                </div>
            )}

            {/* Hiển thị confirmRemove khi showConfirm = true */}
            {showConfirm && (
                <div className="confirmRemove">
                    <div className="confirmRemove-content">
                        Confirm to remove this tour?
                    </div>
                    <div className="confirmRemove-btns">
                        <button className="confirmRemove-confirm" onClick={handleConfirmClick}>
                            Confirm
                        </button>
                        <button className="confirmRemove-cancel" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tourbartwo;
