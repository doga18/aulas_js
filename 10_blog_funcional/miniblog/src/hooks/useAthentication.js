// Para trabalhar com banco nesse arquivo, precisamos chamar a config do firebase.
import { db, auth } from "../firebase/config";
//import { auth } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup limpar funções
    const [cancelled, setCancelled] = useState(false)    

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    // função de registro

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            return user
        }catch(e){
            console.log(e)
            console.log(typeof e.message)

            let systemErrorMessage
            if(e.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"                                
            }else if(e.message.includes("auth/email-already-in-use")){
                systemErrorMessage = "E-mail já cadastrado"
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor, tente novamente mais tarde."
            }
            setError(systemErrorMessage);
        }
        setLoading(false)
    }

    const LoginUser = async (data) => {
        setLoading("Carregando...")
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        // Tentando autenticar o usuários.
        try{
            setLoading(`Logando ${data.email}`)
            const {user} = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            return user;
        }catch(e){
            if(e.message.includes('auth/invalid-credential')){
                setError("Não foi possível realizar o Login, verifique seu e-mail e senha e tente novamente.")
            }else{
                setError("Erro Geral")
            }
            console.log(e)
        }
    }

    // logout

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    //
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth, createUser, error, loading, logout, LoginUser
    }
}