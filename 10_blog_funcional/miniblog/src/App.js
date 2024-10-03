import './App.css';

// importando os hook para usar o react-router-dom

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Função que mapeia se a autenticação do usuário foi realizada com sucesso.
import { onAuthStateChanged } from 'firebase/auth';
// hooks
import {useState, useEffect} from 'react';
import { useAuthentication } from './hooks/useAthentication';

// context

import { AuthProvider } from './context/AuthContext';

// Pages para colocar nas rotas.
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import CreatePost from "./pages/CreatePost/CreatePost"
import Dashboard from "./pages/Dashboard/Dashboard"
// import Perfil from "./pages/Perfil/PerfilUser"
import Search from './pages/Search/Search';

// Importando componentes, para ir montando nosso site.
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  // Instanciando a auth do hook personalizado;
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
            <div className="container">        
              <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
                {/* <Route path='/Perfil/' element={user ? <Perfil /> : <Navigate to="/login" />} /> */}
                <Route path='/search' element={user ? <Search /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
