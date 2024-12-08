import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searched-bar.css';
import { BASE_URL } from '../../utils/config';

function SearchBar() {
    const [location, setLocation] = useState("Ho Chi Minh");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Chuẩn bị query string
            const queryParams = new URLSearchParams({
                location,
                startDate: fromDate,
                endDate: toDate,
            }).toString();

            // Gửi yêu cầu fetch API
            const response = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParams}`);
            const data = await response.json();

            if (response.ok) {
                console.log(data.data); // Xử lý dữ liệu trả về (ví dụ: hiển thị kết quả)
                // Chuyển hướng người dùng đến trang kết quả với query và state
                navigate(`/tour-result-traveler?location=${location}&startDate=${fromDate}&endDate=${toDate}`, {
                    state: { results: data.data },
                });
            } else {
                console.error(data.message);
                alert('Không tìm thấy kết quả phù hợp.');
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };

    return (
        <div className="search-bar">
            <div className="select-group">
                <div className="search-bar__inner-right">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Location:</span>
                </div>
                <div className="custom-select-container">
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        aria-label="Select location"
                    >
                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                        <option value="Ha Noi">Ha Noi</option>
                        <option value="Can Tho">Can Tho</option>
                        <option value="Da Nang">Da Nang</option>
                        <option value="Hue">Hue</option>
                        <option value="Hai Phong">Hai Phong</option>
                        <option value="Nha Trang">Nha Trang</option>
                        <option value="Quy Nhon">Quy Nhon</option>
                        <option value="Vinh">Vinh</option>
                        <option value="Saigon">Saigon</option>
                        <option value="Paris">Paris</option>
                        <option value="London">London</option>
                        <option value="New York">New York</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Seoul">Seoul</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="Beijing">Beijing</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Rome">Rome</option>
                        <option value="Moscow">Moscow</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Cairo">Cairo</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Mexico City">Mexico City</option>
                        <option value="Istanbul">Istanbul</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Lima">Lima</option>
                        <option value="Sevilla">Sevilla</option>
                        <option value="Athens">Athens</option>
                        <option value="Warsaw">Warsaw</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="Oslo">Oslo</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Zurich">Zurich</option>
                        <option value="Brussels">Brussels</option>
                        <option value="Vancouver">Vancouver</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Milan">Milan</option>
                        <option value="Prague">Prague</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Kiev">Kiev</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Sydney">Sydney</option>
                    </select>
                </div>
            </div>

            <div className="choose-date">
                From:
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    aria-label="From date"
                />
                <div className="bar">
                    <i className="fa-solid fa-minus"></i>
                </div>
                To:
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    aria-label="To date"
                />
            </div>

            {/* Đổi từ Link sang button với onClick */}
            <button
                onClick={handleSearch}
                aria-label="Search for trips"
                className="search-bar-btn"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
