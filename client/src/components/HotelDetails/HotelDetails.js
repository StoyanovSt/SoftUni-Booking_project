import { useState, useEffect, useContext } from 'react';

import UserInfoContext from '../../contexts/UserInfoContext.js';

import Guest from './Guest/Guest.js';
import Owner from './Owner/Owner.js';

const HotelDetails = (props) => {
    const { token } = useContext(UserInfoContext);
    const [currentHotelData, setCurrentHotelData] = useState({});
    const [currentUserId, setCurrentUserId] = useState('');    
    const [isCurrentUserHasAlreadyBookedARoomInThisHotel, setIsCurrentUserHasAlreadyBookedARoomInThisHotel] = useState(false);    

    useEffect(() => {
        fetch(`http://localhost:5000/hotel/${props.match.params.hotelId}/details`, {
            headers: {
                'authorization': `${token}`,
            },
        })
            .then(res => res.json())
            .then(response => {
                setCurrentUserId(response.currentLoggedUserId);
                setCurrentHotelData(oldState => oldState = response.hotel);

                if (response.hotel.usersBookedARoom.includes(response.currentLoggedUserId)) {
                    setIsCurrentUserHasAlreadyBookedARoomInThisHotel(true);
                } else {
                    setIsCurrentUserHasAlreadyBookedARoomInThisHotel(false);
                }

            });
    }, []);

    if (currentUserId == currentHotelData.owner) {
        return <Owner hotelData={currentHotelData} />;
    } else {
        return <Guest
            isCurrentUserHasAlreadyBookedARoomInThisHotel={isCurrentUserHasAlreadyBookedARoomInThisHotel}
            hotelData={currentHotelData}
        />;
    }
}

export default HotelDetails;