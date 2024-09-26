import { createContext, useContext } from "react";

import { TitleColorContext } from "../context/TitleColorContext";

export const useTitleColorContext = () => {
    const context = useContext(TitleColorContext)

    if(!context) {
        console.log("Não foi possível importar o contexto.")
    }

    return context;
}