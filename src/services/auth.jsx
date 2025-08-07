import API from "./api"; // අපි හදපු axios instance එක import කරනවා

export const register = async (userData) => {
    try {
       const response = await API.post("users/register", userData);
       return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Registration failed' };
    }
};

export const login = async (credentials) => {
    try {
       const response = await API.post("users/login", credentials);
       return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Login failed' };
    }
};

export const getProfile = async () => {
    try {
        // Interceptor එකෙන් token එක add වෙන නිසා, මෙතනට config ඕන නෑ
       const response = await API.get("users/profile");
       return response.data; 
    } catch (error) {
        throw error.response?.data || { msg: 'Failed to fetch profile' };
    }
};