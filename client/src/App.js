import { Route, Redirect, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';

function App() {
    return (
        < div className="site-wrapper" >
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
