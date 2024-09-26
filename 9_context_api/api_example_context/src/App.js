//import logo from './logo.svg';
import './App.css';

// Import de hooks do react dom

import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';

// Import de components

// import Navbar from './Components/Navbar';

import Navbar from './Components/Navbar';

// Import de hooks

// Import de Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Products from './pages/Products';


function App() {
  return (
    <div className="App">
      <BrowserRouter>        
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />}></Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
