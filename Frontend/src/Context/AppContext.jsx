import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
const [unseenNotifications, setUnseenNotifications] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("user_data"));
        console.log("Stored Data:", storedData);
    
        if (storedData && storedData.userToken && storedData.user) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setisAuthenticated(true);
        } else {
            console.log("Invalid or missing user data in localStorage");
            localStorage.removeItem("user_data"); 
            setisAuthenticated(false); 
        }
        setLoading(false); 
    }, []);

    const markNotificationAsSeen = (notificationId) => {
        setUnseenNotifications(prev => 
            prev.filter(id => id !== notificationId)
        );
    };
    const markAllNotificationsAsSeen = (notificationIds) => {
  setUnseenNotifications(prev => 
    prev.filter(id => !notificationIds.includes(id))
  );
};

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
        setNotificationCount(0);
    };

    const value = {
        token,
        isAuthenticated,
        userData,
        loading,
        notificationCount: unseenNotifications.length,
        setUnseenNotifications, 
        markNotificationAsSeen,
        markAllNotificationsAsSeen,
        login,
        logout,

    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
