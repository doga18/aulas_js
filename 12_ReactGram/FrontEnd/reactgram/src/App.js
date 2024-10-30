import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aqui começa a part de <code>Front End</code> do ReactGram!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Seja bem vindo ao <code>Front end</code> do projeto <code>FullStack</code> do ReactGra, cópia do <code>Instragram.</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Descubra mais sobre o React.
        </a>
      </header>
    </div>
  );
}

export default App;
