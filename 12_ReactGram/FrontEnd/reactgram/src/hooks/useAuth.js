// Hook created to use how a middleware and verify if that's user is authenticated or not.
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export const useAuth = () => {
  // Verify that the user is authenticated.
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth ] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user){
      setAuth(true);      
    }else{
      setAuth(false);
      
    }
    setLoading(false);
  }, [user])

  return { auth, loading };
}