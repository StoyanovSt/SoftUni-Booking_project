import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import loginUser from './loginService.js';
import config from '../../config/config.js';

const Login = (props) => {
    const [redirect, setRedirect] = useState(false);

    const onClickHandler = (e) => {
        e.preventDefault();

        const username = e.target.parentNode.username.value;
        const password = e.target.parentNode.password.value;

        loginUser(config.LOG_USER_PATH, username, password)
            .then(response => response.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                } else {
                    localStorage.setItem('user', JSON.stringify({ TOKEN: response.token, USERNAME: response.username }));
                    props.onAuthChange();
                    setRedirect(true);
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to="/" />;
    } else {
        return (
            <section id="viewLogin">
                <h2>Login:</h2>
                <form id="formLogin">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter your Username" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password" />
                    <input onClick={(e) => onClickHandler(e)} type="submit" className="login" value="Login" />
                </form>
            </section>
        );
    }
}

export default Login;