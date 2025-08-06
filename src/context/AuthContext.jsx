import React, { createContext, useContext, useState, useEffect } from "react";
import { login, register, getProfile } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch profile on load:", error);
                    signOut();
                }
            }
            setLoading(false);
        };
        loadUserFromStorage();
    }, []);

    const signIn = async (credentials) => {
        try {
            const response = await login(credentials); // login service ek call krnw
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            
            return response; 
    
        } catch (error) {
            console.error("Context signIn error:", error);
            throw error.response?.data || { msg: "An unknown error occurred" };
        }
    };

    const signUp = async (userData) => { 
        try {
            const response = await register(userData); // register service ek call krnw
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            
            return response; 
    
        } catch (error) {
            console.error("Context signUp error:", error);
            throw error.response?.data || { msg: "An unknown error occurred" };
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = { user, loading, signIn, signUp, signOut };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};