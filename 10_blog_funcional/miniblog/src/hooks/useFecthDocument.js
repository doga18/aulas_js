import React, { useState, useEffect } from 'react';
import {db} from "../firebase/config";
import { collection, where, QuerySnapshot, doc, getDoc, onSnapshot, setDoc} from "firebase/firestore";

export const useFetchDocument = (docCollection, uid) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        // A função será assíncrona enquanto busca os dados no banco!

        async function loadDocument(){
            if(cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                // let q = await getDoc(doc(collectionRef, "posts", uid))
                // if(q){
                //     setDocument(q);
                //     setLoading(false)
                // }

                const docRef = await doc(db, docCollection, uid)
                const docSnap = await getDoc(docRef)

                await setDocument(docSnap.data())

                //console.log(`Resultado do setDocument ${document}`)
                setLoading(false)
            } catch (error) {
                setError(error.message);
                setLoading(false);                
            }
        }
        loadDocument()
    }, [docCollection, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {document, error, loading}
}