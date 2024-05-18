import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useSnackbar } from 'notistack';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();


  const login = async (matricule, birthdate) => {
    setIsLoading(true);
    setError(null);
  
    const response = await fetch('https://eplan-backend.onrender.com/profs/loginprof', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricule, birthdate }),
    });
  
    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
      setIsLoading(false);
      return;
    }
  
    const json = await response.json(); // Parse response
    localStorage.setItem('user', JSON.stringify(json)); // Store token in local storage
  
    // Update user context or dispatch actions based on your state management (optional)
    dispatch({ type: 'LOGIN', payload: json });
  
    enqueueSnackbar('Connexion réussie ', { variant: 'success' });
    setIsLoading(false);
  };
  
  return { login, isLoading, error }
}