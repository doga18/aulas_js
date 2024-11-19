// Imports hooks from to know about if the user is authenticated.
import { useAuth } from './hooks/useAuth.js';

// Imports hooks from the react route dom.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Imports styles from css.js
import './App.css';

// Imports components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Imports Pages of Project
import Home from './pages/home/Home.js';
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import About from './pages/about/About';
import Profiler from './pages/profiler/Profiler';

function App() {
  const { auth, loading } = useAuth();

  if(loading){
    console.log('Carregando, Loading Ativado!')
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>              
              <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={auth ? <Navigate to="/" /> : <Register />} />
              <Route path="/profile/:id" element={auth ? <Profiler /> : <Navigate to="/login" />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>          
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
