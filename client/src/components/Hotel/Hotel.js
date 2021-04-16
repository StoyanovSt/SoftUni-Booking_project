import { Link } from 'react-router-dom';

const Hotel = (props) => {    
    return (
        <Link to="" className="added-hotel">
            <img src={props.imageUrl} alt=""
                className="picture-added-hotel" />
            <h3>{props.name} {props.city}</h3>
            <span>Free rooms: {props.freeRooms}</span>
        </Link>
    );
}

export default Hotel;