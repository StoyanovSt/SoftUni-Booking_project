import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserInfoContext from '../../contexts/UserInfoContext.js';

const Header = () => {
    const { isLogged, username } = useContext(UserInfoContext);

    if (isLogged) {
        return (
            <nav>
                <div className="left-container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/hotel/add">Add +</Link></li>
                    </ul>
                </div>
                <div className="right-container">
                    <Link to="/user/profile" className="log-out">{`${username}' profile`}</Link>
                    <Link to="/logout" className="log-out">Logout</Link>
                </div>
            </nav>
        );
    } else {
        return (
            <nav>
                <div className="left-container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }

}

export default Header;