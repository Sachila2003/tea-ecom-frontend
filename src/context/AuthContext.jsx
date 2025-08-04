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
            // 1. service එක call කරලා backend එකෙන් data ගන්නවා
            const response = await login(credentials);
            
            // 2. data ටික localStorage එකේ සහ state එකේ save කරනවා
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user)); // User object එක string කරලා save කරන එක හොඳයි
            setUser(response.user);
            
            // 3. !! වැදගත්ම දේ: සාර්ථක response එක return කරනවා !!
            // එතකොට Login.jsx එකට මේ data ටික ලැබෙනවා
            return response; 
    
        } catch (error) {
            // Error එකක් ආවොත් විතරක් ඒක re-throw කරනවා
            console.error("Context signIn error:", error);
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
        localStorage.removeItem('user'); // <-- මේ line එකත් එකතු කරන්න
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