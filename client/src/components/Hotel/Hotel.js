import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserInfoContext from '../../contexts/UserInfoContext.js';

const Hotel = (props) => {
    const { isLogged } = useContext(UserInfoContext);

    return (
        <Link to={isLogged === true ? `/hotel/${props.id}/details` : '/login'} className="added-hotel">
            <img src={props.imageUrl} alt=""
                className="picture-added-hotel" />
            <h3>{props.name} {props.city}</h3>
            <span>Free rooms: {props.freeRooms}</span>
        </Link>
    );
}

export default Hotel;