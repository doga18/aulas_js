// 1 - criar contexto.

import { Children, createContext, useState } from "react";

//const CounterContex = null

export const CounterContext = createContext();

// 2 - criar o provider

export const CounterContextProvider = ({children}) => {
    const [counter, setCounter] = useState(6);

    return(
        <CounterContext.Provider value={{counter, setCounter}}>
            {children}
        </CounterContext.Provider>
    )
}