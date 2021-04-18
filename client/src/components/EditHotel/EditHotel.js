import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserInfoContext from '../../contexts/UserInfoContext.js';

import updateHotelData from './editHotelService.js';

const EditHotel = (props) => {
    const [currentHotel, setCurrentHotel] = useState({});
    const [redirect, setRedirection] = useState(false);
    const { token } = useContext(UserInfoContext);

    useEffect(() => {
        fetch(`http://localhost:5000/hotel/${props.match.params.hotelId}/edit`, {
            headers: {
                'authorization': `${token}`,
            }
        })
            .then(res => res.json())
            .then(response => {
                setCurrentHotel(response.hotel);
            });
    }, []);

    console.log(currentHotel);

    const onClickHandler = (e) => {
        e.preventDefault();

        const hotel = e.target.parentNode.hotel.value;
        const city = e.target.parentNode.city.value;
        const freeRooms = e.target.parentNode.freeRooms.value;
        const imgUrl = e.target.parentNode.imgUrl.value;

        updateHotelData(
            `http://localhost:5000/hotel/${props.match.params.hotelId}/edit`,
            token,
            hotel,
            city,
            freeRooms,
            imgUrl
        )
            .then(response => response.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                } else {
                    setRedirection(true);
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to={`/hotel/${props.match.params.hotelId}/details`} />
    }

    if (!currentHotel) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="added-hotels">
                    <h1>Loading, please wait...</h1>
                </div>
            </section>
        );
    } else {
        return (
            <section id="viewAddhotel">
                <h2>Edit existing hotel</h2>
                <form id="formAddhotel">
                    <label htmlFor="hotel">Hotel name:</label>
                    <input type="text" id="hotel" name="hotel" defaultValue={currentHotel.name} />
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" defaultValue={currentHotel.city} />
                    <label htmlFor="free-rooms">Free rooms:</label>
                    <input type="number" id="free-rooms" name="freeRooms" defaultValue={currentHotel.freeRooms} />
                    <label htmlFor="imgUrl">Image:</label>
                    <input type="text" id="imgUrl" name="imgUrl" defaultValue={currentHotel.imageUrl} />
                    <input onClick={(e) => onClickHandler(e)} type="submit" className="create" value="Edit" />
                </form>
            </section>
        );
    }
}

export default EditHotel;