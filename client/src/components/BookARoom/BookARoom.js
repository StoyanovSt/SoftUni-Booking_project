import { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import UserInfoContext from '../../contexts/UserInfoContext.js';

const BookARoom = (props) => {
    const [redirect, setRedirect] = useState(false);
    const { token } = useContext(UserInfoContext);

    useEffect(() => {
        fetch(`http://localhost:5000/hotel/${props.match.params.hotelId}/book`, {
            headers: {
                'authorization': `${token}`,
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                }

                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!redirect) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="added-hotels">
                    <h1>Loading, please wait...</h1>
                </div>
            </section>
        );
    } else {
        return <Redirect to={`/hotel/${props.match.params.hotelId}/details`} />;
    }
}

export default BookARoom;