export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            // Save user to local storage
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                user: action.payload
            };
        case "LOGOUT":
            localStorage.removeItem("user");
            return {
                user: null
            };
        default:
            return state;
    }
}

export const retrieveUserFromLocalStorage = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } catch (error) {
        console.error("Error parsing user data from local storage", error);
        return null;
    }
}