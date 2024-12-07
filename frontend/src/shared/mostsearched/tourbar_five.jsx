import './tourbar-five.css';
import { Link } from 'react-router-dom';

function Tourbarfive({ item, booking, isSelected, onClick }) {
    const { TourName, Locations, StartDate, EndDate, Price, LanguageOffers, TourStatus } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    return (
        <div className="tour-barfive">
            <div className="tour-barfive-header">
                <div className="tour-barfive-headerName">
                    {TourName}
                </div>
                <div className="tour-barfive-headerPrice">{formattedPrice} VND</div>
            </div>
            <div className="tour-barfive-content">
                <div className="tour-barfive-contentTime">
                    <div className="tour-barfive-contentStartDate">
                        <div>From:</div>
                        <div>{new Date(StartDate).toLocaleDateString()}</div>
                    </div>
                    <div className="tour-barfive-contentEndDate">
                        <div>To:</div>
                        <div>{new Date(EndDate).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="tour-barfive-contentLocation">
                    <div>Location: </div>
                    <div>{Locations.join(' > ')}</div>
                </div>
                <div className="tour-barfive-contentLanguages">
                    <div>Languages offers:</div>
                    <div>{LanguageOffers.join(', ')}</div>
                </div>
            </div>
            <div className="tour-barfive-foot">
                <div className="tour-barfive-footStatus">{TourStatus}</div>
            </div>
        </div>
    );
}

export default Tourbarfive;
