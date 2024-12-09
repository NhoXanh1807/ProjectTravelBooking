import './tourbar_three.css';
import { Link } from 'react-router-dom';

function Tourbarthree({ item, isSelected, onClick }) {
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus, BookingStatus } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    // Function to render booking status button
    const renderBookingStatus = () => {
        if (item) {
            if (BookingStatus === "Pending" && TourStatus === "Available") {
                return null;
            } else if (BookingStatus === "In Progress" && TourStatus === "Available") {
                return (
                    <div className="in-progress">
                        In Progress
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="tour-barthree">
            <div className="tour-barthree-header">
            <div className="tour-barthree-headerName">
    {!(BookingStatus === "In Progress" && TourStatus === "Available") && (
        <input
            type="radio"
            name="tourSelection"
            checked={isSelected} // Check the radio button if selected
            onChange={onClick} // Trigger the selection change
        />
    )}
    {TourName}
</div>

                <div className="tour-barthree-headerPrice">{formattedPrice} VND</div>
            </div>
            <div className="tour-barthree-content">
                <div className="tour-barthree-contentTime">
                    <div className="tour-barthree-contentStartDate">
                        <div>From:</div>
                        <div>{new Date(StartDate).toLocaleDateString()}</div>
                    </div>
                    <div className="tour-barthree-contentEndDate">
                        <div>To:</div>
                        <div>{new Date(EndDate).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="tour-barthree-contentLocation">
                    <div>Location: </div>
                    <div>{Locations.join(' > ')}</div>
                </div>
                <div className="tour-barthree-contentLanguages">
                    <div>Languages offers:</div>
                    <div>{LanguageOffers.join(', ')}</div>
                </div>
            </div>
            <div className="tour-barthree-foot">
                <div className="tour-barthree-footStatus">{TourStatus}</div>
                {renderBookingStatus()}
            </div>
        </div>
    );
}

export default Tourbarthree;
