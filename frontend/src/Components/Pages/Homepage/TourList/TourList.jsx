import {React, useState} from 'react'
import './TourList.css'
import tour1 from './tourimages/tour1.jpg'

const TourList = () => {
    const tours = [
        { id: 1, title: 'Discover Vietnam', location: 'Ha Noi', duration: '10 days', price: '6.900.000 VND', image: tour1 },
        { id: 2, title: 'Explore Thailand', location: 'Bangkok', duration: '7 days', price: '5.500.000 VND', image: tour1 },
        { id: 3, title: 'Visit Japan', location: 'Tokyo', duration: '14 days', price: '10.000.000 VND', image: tour1 },
        { id: 4, title: 'Relax in Bali', location: 'Bali', duration: '7 days', price: '4.500.000 VND', image: tour1 },
        { id: 5, title: 'Safari in Kenya', location: 'Nairobi', duration: '14 days', price: '8.000.000 VND', image: tour1 }
      ];
      
    const TourItem = ({ tour, onClick }) => {
        return (
          <div className='tour-item' onClick={() => onClick(tour)}>
            <img src={tour.image} alt={tour.title} />
            <div>
              <h3>{tour.title}</h3>
              <p>Location: <b>{tour.location}</b> · Duration: <b>{tour.duration}</b></p>
              <b>{tour.price}</b>
            </div>
          </div>
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTour(null);
    };


    return (
        <div className='TourList'>
            <h1>Most Searched Tours</h1>
            <div className='tour-container'>
                {tours.map((tour) => (
                    <TourItem key={tour.id} tour={tour} onClick={handleItemClick} />
                ))}
                {isModalOpen && selectedTour && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedTour.image} alt={selectedTour.title} />
                        <div className="modal-info">
                        <h2>{selectedTour.title}</h2>
                        <p><b>Location:</b> {selectedTour.location}</p>
                        <p><b>Duration:</b> {selectedTour.duration}</p>
                        <p><b>Price:</b> {selectedTour.price}</p>
                        <p><b>Available Seats:</b> {selectedTour.availableSeats}</p>
                        <p><b>From:</b> {selectedTour.fromDate} <b>To:</b> {selectedTour.toDate}</p>
                        <p><b>Languages Offered:</b> {selectedTour.languages}</p>
                        <p><b>Cancel Policy:</b> {selectedTour.cancelPolicy}</p>
                        <p><b>Description:</b> {selectedTour.description}</p>
                        <button className="book-btn">Book Now</button>
                        </div>
                        <span className="close-btn" onClick={handleCloseModal}>&times;</span>
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TourList