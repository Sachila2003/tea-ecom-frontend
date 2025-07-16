import { createContext, useContext, useState, useEffect } from "react";
import { login, register, getProfile } from "../services/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        loadUser = async () => {
            try {
                token = localStorage.getItem('token');
                if (token) {
                    const userData = await getProfile();
                    setUser(userData);
                }
            } catch (error) {
                console.log(error);
            }
            loadUser();
        }, []
    );
    
    const signIn = async (Credentials) => {
        try {
            const {token,user} = await login(Credentials);
            localStorage.setItem('token',token);
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
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );

};
