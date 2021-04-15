import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <nav>
            <div className="left-container">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="">Add +</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
            <div className="right-container">
                <Link to="/user/profile" className="log-out">'User profile'</Link>
                <Link to="/logout" className="log-out">Logout</Link>
            </div>
        </nav>
    );
}

export default Header;