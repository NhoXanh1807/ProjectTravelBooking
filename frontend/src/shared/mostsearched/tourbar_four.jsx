import './tourbar_fourth.css';
import { Link } from 'react-router-dom';

function Tourbarfourth({ item }) {
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus, _id } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);
    console.log("Item:", item);
    console.log(item.BookingStatus);
    console.log(item.TourStatus);
    // Determine the payment status
    const renderPaymentStatus = () => {
        if (item) {
            if (item.BookingStatus === "Confirmed" && item.TourStatus === "Available") {
                return (
                    <div className="paid-btn">
                        PAID
                        <Link to="/refund" state={{ tour: item }}>
                            <button className="Paid-cancel">Cancel</button>
                        </Link>
                    </div>
                );
            } else if (item.BookingStatus === "Confirmed" && item.TourStatus === "Unavailable") {
                return (
                        <button className="Refund">
                            Refund<i className="fa-solid fa-arrow-right"></i>
                        </button>
                );
            } else if (item.BookingStatus === "Pending" && item.TourStatus === "Unavailable") {
                return (
                    <div className="Unable-pay">
                        Unable to Pay
                    </div>
                );
            }else if (item.BookingStatus === "Cancelled" && item.TourStatus === "Available"){
                return(
                    <div className="Unable-pay">
                    Cancelled
                    </div>
                )

                
            }
        }
        return null;
    };

    return (
        <div className="tour-barfourth">
            <div className="tour-barfourth-header">
                <div className="tour-barthree-headerName">{TourName}</div>
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
                {renderPaymentStatus()}
            </div>
        </div>
    );
}

export default Tourbarfourth;