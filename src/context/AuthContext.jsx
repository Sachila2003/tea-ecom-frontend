import React, { createContext, useContext, useState, useEffect } from "react";
import { login, register, getProfile } from '../services/auth';
import API from "../services/api"; // Axios instance එක import කරනවා

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (token) {
                    // Axios interceptor එකට token එක set කරනවා
                    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // User data localStorage එකේ තියෙනවා නම්, මුලින්ම ඒකෙන් load කරනවා
                    // Page refresh කරද්දි flicker වෙන එක නවත්තන්න
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                    
                    // Token එක valid ද කියලා බලන්න, profile එක fetch කරනවා
                    const latestUserData = await getProfile();
                    setUser(latestUserData);
                    localStorage.setItem('user', JSON.stringify(latestUserData));
                }
            } catch (error) {
                console.error("Failed to fetch profile on load. Signing out.", error);
                signOut(); // Token එක invalid නම්, logout කරනවා
            } finally {
                setLoading(false);
            }
        };
        loadUserFromStorage();
    }, []);

    const signIn = async (credentials) => {
        try {
            const response = await login(credentials);
            if (response && response.token && response.user) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                API.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                setUser(response.user);
                return response;
            } else {
                throw { msg: "Invalid response from server." };
            }
        } catch (error) {
            console.error("AuthContext SignIn Error:", error);
            throw error; // auth.js එකෙන් එන error එකම ආපහු throw කරනවා
        }
    };

    const signUp = async (userData) => {
        try {
            // Register වුණාම, backend එකෙන් token එකකුත් එනවා නම්, මෙතන auto-login කරන්නත් පුළුවන්
            const response = await register(userData);
            return response;
        } catch (error) {
            console.error("AuthContext SignUp Error:", error);
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // --- !! මෙන්න අලුතෙන් එකතු කරන Function එක !! ---
    // Settings.jsx වගේ තැන් වල ඉඳන් user state එක update කරන්න
    const updateUserContext = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
    };

    // Context එකෙන් share කරන values
    const value = { 
        user, 
        loading, 
        signIn, 
        signUp, 
        signOut,
        updateUserContext
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
