// Imports hooks from the react route dom.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Imports styles from css.js
import './App.css';

// Imports components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Imports Pages of Project
import Home from './pages/home/Home.js';
import Login from './pages/login/Login';
import About from './pages/about/About';

// Initialized components
//const navigate = Navigate;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>          
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
