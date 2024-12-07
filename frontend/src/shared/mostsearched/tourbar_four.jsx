import './tourbar_fourth.css';
import { Link } from 'react-router-dom';

function Tourbarfourth({ item, booking }) {
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus, _id } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    // Find the booking associated with this tour
    const renderPaymentStatus = () => {
        if (booking && booking.BookingStatus === "Confirmed" && TourStatus === "Available") {
            return (
                <div className="paid-btn">
                    PAID
                    <Link 
                        to="/refund"
                        state={{
                            booking,
                            tour: item
                        }}
                    >
                        <button className="Paid-cancel">Cancel</button>
                    </Link>
                </div>
            );
        } else if (booking && booking.BookingStatus === "Confirmed" && TourStatus === "Unavailable") {
            return (
                <Link 
                    to="/refund"
                    state={{
                        booking,
                        tour: item
                    }}
                >
                    <button className="Refund">
                        Refund<i className="fa-solid fa-arrow-right"></i>
                    </button>
                </Link>
            );
        } else if (booking && booking.BookingStatus === "Pending" && TourStatus === "Unavailable") {
            return (
                <div className="Unable-pay">
                    Unable to Pay
                </div>
            );
        }
    };

    return (
        <div className="tour-barfourth">
            <div className="tour-barfourth-header">
                <div className="tour-barthree-headerName">
                    {TourName}
                </div>
                <div className="tour-barfourth-headerPrice">{formattedPrice} VND</div>
            </div>
            <div className="tour-barfourth-content">
                <div className="tour-barfourth-contentTime">
                    <div className="tour-barfourth-contentStartDate">
                        <div>From:</div>
                        <div>{new Date(StartDate).toLocaleDateString()}</div>
                    </div>
                    <div className="tour-barfourth-contentEndDate">
                        <div>To:</div>
                        <div>{new Date(EndDate).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="tour-barfourth-contentLocation">
                    <div>Location: </div>
                    <div>{Locations.join(' > ')}</div>
                </div>
                <div className="tour-barfourth-contentLanguages">
                    <div>Languages offers:</div>
                    <div>{LanguageOffers.join(', ')}</div>
                </div>
            </div>
            <div className="tour-barfourth-foot">
                <div className="tour-barfourth-footStatus">{TourStatus}</div>
                {renderPaymentStatus()} {/* Call the renderPaymentStatus function */}
            </div>
        </div>
    );
}

export default Tourbarfourth;
