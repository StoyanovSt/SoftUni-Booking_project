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
import BookARoom from './components/BookARoom/BookARoom.js';
import EditHotel from './components/EditHotel/EditHotel.js';
import UserProfile from './components/UserProfile/UserProfile.js';

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
                username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).USERNAME : '',
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
                    <Route path="/hotel/:hotelId/book" exact component={BookARoom} />
                    <Route path="/hotel/:hotelId/edit" exact component={EditHotel} />
                    <Route path="/user/profile" exact component={UserProfile} />
                </Switch>
                <Footer />
            </UserInfoContext.Provider>
        </div>
    );
}

export default App;
