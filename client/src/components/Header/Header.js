const Header = () => {

    return (
        <nav>
            <div className="left-container">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Add +</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Login</a></li>
                </ul>
            </div>
            <div className="right-container">
                <a href="" className="log-out">'User profile'</a>
                <a href="" className="log-out">Logout</a>
            </div>
        </nav>
    );
}

export default Header;