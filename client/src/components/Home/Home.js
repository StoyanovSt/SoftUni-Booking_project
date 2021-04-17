import { useState, useEffect } from 'react';

import Hotel from '../Hotel/Hotel.js';
import config from '../../config/config.js';

const Home = () => {
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch(config.HOME_PATH)
            .then(res => res.json())
            .then(response => {
                setIsDataFetched(true);
                setHotels(response.hotels);
            });
    }, []);

    if (!isDataFetched) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="added-hotels">
                    <h1>Loading, please wait...</h1>
                </div>
            </section>
        );
    } else if (isDataFetched && hotels.length === 0) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="guest">
                    There are no Hotels found...
                </div>
            </section>
        );
    } else if (isDataFetched && hotels.length > 0) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="added-hotels">
                    {hotels.map(hotel => {
                        return <Hotel
                            key={hotel._id}
                            id={hotel._id}
                            name={hotel.name}
                            city={hotel.city}
                            freeRooms={hotel.freeRooms}
                            imageUrl={hotel.imageUrl}
                        />;
                    })}
                </div>
            </section>
        );
    }
}

export default Home;