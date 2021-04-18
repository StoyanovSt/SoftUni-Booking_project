import { useState, useEffect, useContext } from 'react';

import UserInfoContext from '../../contexts/UserInfoContext.js';
import config from '../../config/config.js';
import UserReservation from '../UserReservation/UserReservation.js';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [userReservations, setUserReservations] = useState([]);
    const { token } = useContext(UserInfoContext);

    useEffect(() => {
        fetch(config.USER_PROFILE_PATH, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`,
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                }

                setUser(oldState => oldState = {
                    username: response.username,
                    email: response.userEmail,
                });

                setUserReservations(response.userReservations);
            });
    }, []);

    if (!user) {
        return (
            <section id="viewCatalog" className="background-img">
                <div className="guest">
                    There are no Hotels found...
                </div>
            </section>
        );
    } else {
        return (
            <section id="viewhotelDetails">
                <div className="profile"><img src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png" alt="default user" />
                    <h3>User Info:</h3>
                    <div className="flex">
                        <p>Username: </p>
                        <p>{user.username}</p>
                    </div>
                    <div className="flex">
                        <p>Email: </p>
                        <p>{user.email}</p>
                    </div>
                    <div className="flex">
                        <p>Reservations: </p>
                        <p>
                            {userReservations.map(reservedHotel => {
                                return <UserReservation
                                    key={reservedHotel._id}
                                    name={reservedHotel.name}
                                    city={reservedHotel.city}
                                />;
                            })}
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default UserProfile;