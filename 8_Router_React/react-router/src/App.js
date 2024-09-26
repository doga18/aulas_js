//import logo from './logo.svg';
import './App.css';

// 1 - config react router

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Componentes
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

// Import as pages

import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Info from './Pages/Info';
import NotFound from './Pages/NotFound';
import Search from './Pages/Search';

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
      {/* 2 - lnks com react router */}
        <Navbar />
        <SearchForm>

        </SearchForm>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 4 - rota dinamic */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/:id/info" element={<Info />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          {/* 10 - redirect */}
          <Route path='/company' element={<Navigate to="/about" />} />
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
