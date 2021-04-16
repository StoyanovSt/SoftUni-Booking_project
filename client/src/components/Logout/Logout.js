import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    localStorage.removeItem('user');
    props.onAuthChange();
    return <Redirect to="/" />;
}

export default Logout;