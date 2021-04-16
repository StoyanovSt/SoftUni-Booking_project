import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import postHotelDataToServer from './addHotelService.js';
import config from '../../config/config.js';
import UserInfoContext from '../../contexts/UserInfoContext.js';

const AddHotel = () => {
    const [redirect, setRedirect] = useState(false);
    const { token } = useContext(UserInfoContext);

    const onClickHandler = (e) => {
        e.preventDefault();

        const name = e.target.parentNode.hotel.value;
        const city = e.target.parentNode.city.value;
        const freeRooms = e.target.parentNode.freeRooms.value;
        const imageUrl = e.target.parentNode.imgUrl.value;

        postHotelDataToServer(config.ADD_HOTEL_PATH, token, name, city, freeRooms, imageUrl)
            .then(response => response.json())
            .then(response => {
                if (response.hasError) {
                    if (response.unauthorized) {
                        throw new Error(response.message);
                    }

                    throw new Error(response.message);
                } else {
                    setRedirect(true);
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to='/' />
    } else {
        return (
            <section id="viewAddhotel">
                <h2>Add new hotel</h2>
                <form id="formAddhotel">
                    <label htmlFor="hotel">Hotel name:</label>
                    <input type="text" id="hotel" name="hotel" placeholder="Hotel name" />
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" placeholder="City" />
                    <label htmlFor="free-rooms">Free rooms:</label>
                    <input type="number" id="free-rooms" name="freeRooms" placeholder="Free rooms" />
                    <label htmlFor="imgUrl">Image:</label>
                    <input type="text" id="imgUrl" name="imgUrl" placeholder="https://" />

                    <input onClick={(e) => onClickHandler(e)} type="submit" className="create" value="Add" />
                </form>
            </section>
        );
    }
}

export default AddHotel;