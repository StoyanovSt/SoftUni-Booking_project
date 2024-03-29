import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import postUserDataToServer from './registerService.js';
import config from '../../config/config.js';

const Register = () => {
    const [redirect, setRedirect] = useState(false);

    const onClickHandler = (e) => {
        e.preventDefault();

        const email = e.target.parentNode.email.value;
        const username = e.target.parentNode.username.value;
        const password = e.target.parentNode.password.value;
        const rePassword = e.target.parentNode.rePassword.value;

        postUserDataToServer(config.REG_USER_PATH, email, username, password, rePassword)
            .then(response => response.json())
            .then(response => {
                if (response.hasError) {
                    throw new Error(response.message);
                } else {
                    setRedirect(true);
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to="/login" />;
    } else {
        return (
            <section id="viewRegister">
                <h2>Create your account:</h2>
                <form id="formRegister">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" placeholder="Email" />
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter your Username" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" />
                    <label htmlFor="rePassword">Repeat Password:</label>
                    <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password" />
                    <input onClick={(e) => onClickHandler(e)} type="submit" className="register" value="Register" />
                </form>
            </section>
        );
    }
}

export default Register;