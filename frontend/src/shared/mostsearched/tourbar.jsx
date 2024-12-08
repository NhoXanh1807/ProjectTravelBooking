import { Link } from 'react-router-dom';
import './tourbar.css'
function Tourbar({ item }) {
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus, _id } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);
    return (
        <div className="tour-bar">
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
                <Link to={`/tour/${_id}`}><button className="book-btn">Book</button></Link>
            </div>
        </div>
    );
}
export default Tourbar;