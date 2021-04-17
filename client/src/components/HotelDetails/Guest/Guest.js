import { Link } from 'react-router-dom';

const Guest = (props) => {
    return (
        <section id="viewhotelDetails">
            <h2>Details</h2>
            <div className="hotel-ticket">
                <div className="hotel-left">
                    <img src={props.hotelData.imageUrl}
                        alt="" />
                </div>
                <div className="hotel-right">
                    <div>
                        <h3>{props.hotelData.name}</h3>
                    </div>
                    <div>
                        {props.hotelData.city}
                    </div>
                    <p><span >Free rooms: {props.hotelData.freeRooms}</span> </p>
                    <p><span className="green">You already have booked a room</span> </p>

                    <Link to="" className="book">Book</Link>
                </div>
            </div>
        </section>
    );
}

export default Guest;