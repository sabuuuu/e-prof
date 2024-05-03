import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            // Save user to local storage
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                user: action.payload
            };
        case "LOGOUT":
            // Remove user from local storage
            localStorage.removeItem("user");
            return {
                user: null
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        // Retrieve user from local storage on component mount
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
