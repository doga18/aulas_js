import { useContext } from "react";
import { CounterContext } from "../context/CounterContex";

export const useCounterContext = () => {
    const context = useContext(CounterContext);

    if(!context) {
        console.log("contexto não encontrado.")
    }

    return context;

}