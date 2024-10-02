import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
//import { collection, addDoc, Timestamp, loadBundle } from 'firebase/firestore';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
//import { useAsyncError } from 'react-router-dom';

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
  console.log(`Chegando no InsertReducer:`)
  console.log(state);
  console.log(action);
    switch(action.type){      
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: 0}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
   
    // lidar com o vazamento de memória
    const [cancelled, setCancelled] = useState(false);
   
    const checkCancelBeforeDispatch = (action) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
   
    const insertDocument = async (document) => {
      checkCancelBeforeDispatch({
        type: "LOADING"
      });
   
      try {
        const newDocument = { ...document, createdAt: Timestamp.now() };
   
        const insertedDocument = await addDoc(
          collection(db, docCollection),
          newDocument
        );
   
        checkCancelBeforeDispatch({
          type: "INSERTED_DOC",
          payload: insertedDocument,
        });
      } catch (error) {
        console.log(`Erro ao inserir documento;`)
        console.log(error)
        checkCancelBeforeDispatch({
          type: "ERROR",
          payload: error.message,
        });
      }
    };
   
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
   
    return { insertDocument, response };
  };