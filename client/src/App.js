import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';

function App() {
    return (
        < div className="site-wrapper" >
            <Header />
            <Home />
            <Footer />
        </div>
    );
}

export default App;
