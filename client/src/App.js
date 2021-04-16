import { Route, Redirect, Switch } from 'react-router-dom';
import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';

import UserInfoContext from './contexts/UserInfoContext.js';

function App() {
    const [isLogged, setUserStatus] = useState(false);

    function onAuthChangeHandler() {
        setUserStatus(isLogged === false ? true : false);
    }

    console.log(isLogged);
    
    return (
        < div className="site-wrapper" >
            <UserInfoContext.Provider value={{
                isLogged,
            }}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact render={() => <Login onAuthChange={onAuthChangeHandler} />} />
                    <Route path="/logout" exact render={() => <Logout onAuthChange={onAuthChangeHandler} />} />
                </Switch>
                <Footer />
            </UserInfoContext.Provider>
        </div>
    );
}

export default App;
