import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HotelDetails = (props) => {
    const [currentHotelData, setCurrentHotelData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/hotel/${props.match.params.hotelId}/details`)
            .then(res => res.json())
            .then(response => {
                setCurrentHotelData(oldState => oldState = response.hotel);
            });
    }, []);

    return (
        <section id="viewhotelDetails">
            <h2>Details</h2>
            <div className="hotel-ticket">
                <div className="hotel-left">
                    <img src={currentHotelData.imageUrl}
                        alt="" />
                </div>
                <div className="hotel-right">
                    <div>
                        <h3>{currentHotelData.name}</h3>
                    </div>
                    <div>
                        {currentHotelData.city}
                    </div>
                    <p><span >Free rooms: {currentHotelData.freeRooms}</span> </p>
                    <p><span className="green">You already have booked a room</span> </p>

                    <Link to="" className="book">Book</Link>
                    <Link to="" className="edit">Edit</Link>
                    <Link to="" className="remove">Delete</Link>
                </div>

            </div>
        </section>
    );
}

export default HotelDetails;