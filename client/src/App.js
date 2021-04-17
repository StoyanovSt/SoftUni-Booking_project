import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import AddHotel from './components/AddHotel/AddHotel.js';
import HotelDetails from './components/HotelDetails/HotelDetails.js';
import DeleteHotel from './components/DeleteHotel/DeleteHotel.js';

import UserInfoContext from './contexts/UserInfoContext.js';

function App() {
    let defaultStateValue = localStorage.getItem('user') ? true : false;
    const [isLogged, setUserStatus] = useState(defaultStateValue);

    function onAuthChangeHandler() {
        setUserStatus(isLogged === false ? true : false);
    }

    return (
        < div className="site-wrapper" >
            <UserInfoContext.Provider value={{
                isLogged,
                token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).TOKEN : '',
            }}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact render={() => <Login onAuthChange={onAuthChangeHandler} />} />
                    <Route path="/logout" exact render={() => <Logout onAuthChange={onAuthChangeHandler} />} />
                    <Route path="/hotel/add" exact component={AddHotel} />
                    <Route path="/hotel/:hotelId/details" exact component={HotelDetails} />
                    <Route path="/hotel/:hotelId/delete" exact component={DeleteHotel} />

                </Switch>
                <Footer />
            </UserInfoContext.Provider>
        </div>
    );
}

export default App;
