import { createContext, useReducer } from "react";

export const TitleColorContext = createContext();

export const titleColorReducer = (state, action) => {
    // switch todo dispatch, vai ter uma action e seu type
    // eslint-disable-next-line default-case
    switch(action.type){
        case "RED":
            return {...state, color: "red"}
        case "BLUE":
            return {...state, color: "blue"}
        default:
            return state;
    }   
}

export const TitleColorContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(titleColorReducer, {color: "purple"})

    console.log(`TitleColorState ${state}` + state.color + dispatch)
    return <TitleColorContext.Provider value={{...state, dispatch}}>{children}</TitleColorContext.Provider>
}