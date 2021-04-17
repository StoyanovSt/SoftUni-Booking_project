import { Redirect } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import UserInfoContext from '../../contexts/UserInfoContext.js';

const DeleteHotel = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const { token } = useContext(UserInfoContext);

    useEffect(() => {
        fetch(`http://localhost:5000/hotel/${props.match.params.hotelId}/delete`, {
            headers: {
                'authorization': `${token}`,
            },
        })
            .then(res => res.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                }

                setIsDeleted(true);
            });
    }, []);

    if (!isDeleted) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="added-hotels">
                    <h1>Loading, please wait...</h1>
                </div>
            </section>
        );
    } else {
        return <Redirect to="/" />
    }
}

export default DeleteHotel;