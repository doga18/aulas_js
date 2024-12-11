import React, {createContext} from 'react';
//import logo from './logo.svg';
import './App.css';

// 4 - importação de components.
import FirstComponent from './components/FirstComponent';
// 5 - importação de componentes com props e desestruturação.
import SecondComponent from './components/SecondComponent';
// Destructuring.
import Destructuring, { Category } from './components/Destructuring';
// useState with typescript
import State from './components/State';
// fixed variables
type tetOrNull = string | null;
type fixed = "Isso" | "Ou" | "Aquilo";
interface IAppContext {
  language: string;
  framework: string;
  projects: number;
}

export const AppContext = createContext<IAppContext | null>(null);

function App() {
  
  // 1 Variaveis
  const name:string = "Mateus";
  const age:number = 30;
  const isWorking:boolean = true;
  // 2 funções
  //                     Variable Type, Return type String.
  const userGreeting = (name: string): string => {
    return `Olá, ${name}!`;
  }
  // 9 - context
  const contextValue: IAppContext = {
    language: "JavaScript",
    framework: "Express",
    projects: 5,
  }
  

  return (
    <div className="App">
      <h1>Type Script</h1>
      <h2>Ola, {name}</h2>
      <p>Voce tem {age} anos</p>
      <p>Você {isWorking? "está" : "não está"} trabalhando</p>
      {isWorking && (
        <p>Estou trabalhando</p>
      )}
      {userGreeting(name)}
      <FirstComponent />
      <SecondComponent name={name} />
      <Destructuring 
        title="Biblía Sagrada"
        content="Ensinamentos da vida e comunhão com cristo."
        commentsQty={10} tags={['genesis', 'salmos', 'lucas', 'apocalipse']}
        category={Category.TS}
      />
      <State />
    </div>
    
  );
}

export default App;
