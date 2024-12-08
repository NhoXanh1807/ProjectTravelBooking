import { useState } from 'react';
import './tourbar_two.css';
import ModifyTour from '../../shared/tour_op/modifyTour';
import { BASE_URL } from '../../utils/config';

function Tourbartwo({ item, className }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(null); // Trạng thái xóa
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const handleCancelClick = () => {
        setShowConfirm(false);
    };

    const handleConfirmClick = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tours/${item._id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the tour.');
            }
    
            const result = await response.json();
            if (result.success) {
                console.log(`Tour with ID ${item._id} deleted successfully.`); // Log thành công
                setDeleteStatus('Successfully deleted the tour.');
                setShowConfirm(false);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error(`Error deleting tour: ${error.message}`); // Log lỗi
            setDeleteStatus(`Error: ${error.message}`);
        }
    };
    

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
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

            {isEditing && (
                <div className="modify-tour-form">
                    <ModifyTour
                        selectedTourId={item._id}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}

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

            {deleteStatus && <div className="delete-status">{deleteStatus}</div>}
        </div>
    );
}

export default Tourbartwo;
