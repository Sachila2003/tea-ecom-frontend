import { createContext, useContext, useState, useEffect } from "react";
import { login, register, getProfile } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await getProfile();
                    setUser(userData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        
        loadUser();
    }, []);

    const signIn = async (credentials) => {
        try {
            const { token, user } = await login(credentials);
            localStorage.setItem('token', token);
            setUser(user);
        } catch (error) {
            throw error.response.data;
        }
    };

    const signUp = async (userData) => {
        try {
            const { token, user } = await register(userData);
            localStorage.setItem('token', token);
            setUser(user);
        } catch (error) {
            throw error.response.data;
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);