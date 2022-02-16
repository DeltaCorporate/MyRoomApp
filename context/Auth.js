import React, {createContext, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = ({email,password}) => {

        setIsLoggedIn(true);
    };
    const logout = () => {
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {
                children
            }
        </AuthContext.Provider>
    );
};