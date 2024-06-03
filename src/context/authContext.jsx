import { createContext, useReducer, useEffect, useRef } from "react";
import { authReducer, retrieveUserFromLocalStorage } from "../utils/authReducer";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,

    });
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const user = retrieveUserFromLocalStorage();
        if (user && isMounted.current) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};