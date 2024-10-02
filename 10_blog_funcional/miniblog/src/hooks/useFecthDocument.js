import React, { useState, useEffect } from 'react';
import {db} from "../firebase/config";
import { collection, where, QuerySnapshot, doc, getDoc, onSnapshot} from "firebase/firestore";

export const useFetchDocument = (docCollection, uid) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        // A função será assíncrona enquanto busca os dados no banco!

        async function loadData(){
            if(cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q = await getDoc(doc(db, "posts", uid))
                if(q){
                    setDocument(q);
                    setLoading(false)
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);                
            }
        }

    }, [docCollection, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {document, error, loading}
}