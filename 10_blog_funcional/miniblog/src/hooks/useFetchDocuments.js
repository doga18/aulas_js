import { useState, useEffect } from 'react';
import {db} from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) =>{
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState("");
    
    useEffect(() => {
        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            console.log(`Os valores são uid: ${uid}`);
            console.log(`Os valores são search ${search}`);

            let q;

            try {
                
                //busca
                //dashboard
                console.log(`começando a busca por ${search}`)
                if(search){
                    q = await query(collectionRef, where("list_tags", "array-contains", search), orderBy("createdAt", "desc"));

                    console.log(`resultado da pesquisa no hook`);
                    console.log(q);
                }
                else if(uid) {
                    // Get the posts created by the user.
                    console.log(`Cai no caso de busco por uid do usuário: ${uid} e o search `);
                    q = await query(collectionRef, 
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc"));
                    console.log(`essa é a pesquisa ${q}`);
                    console.log(q);
                    //
                }
                else{
                    q = await query(collectionRef, orderBy("createdAt", "desc"));    
                }
                try {
                    await onSnapshot(q, (querySnapshot) => {
                        console.log(`resultado da consulta`);
                        console.log(querySnapshot);
                        setDocuments(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                        )
                    })                    
                } catch (error) {
                    console.error(error)
                    setError(error.message)
                }                
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false);
            }            
        }
        loadData();        
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return() => setCancelled(true);
    }, [])
    return { documents, loading, error};
}