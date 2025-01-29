import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const storedData = JSON.parse(localStorage.getItem("user_data"));

    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setisAuthenticated(true);
        }
    }, []); 

    const login = (newToken, newData) => {
        localStorage.setItem(
            "user_data",
            JSON.stringify({ userToken: newToken, user: newData })
        );
        setToken(newToken); 
        setUserData(newData);
        setisAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("user_data");
        setToken(null);
        setUserData(null);
        setisAuthenticated(false);
    };

    const value = {
        token,
        isAuthenticated,
        userData,
        login,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
