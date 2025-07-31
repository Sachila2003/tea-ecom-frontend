import API from "./api";


export const register = async (userData) => {
    try {
       const response = await API.post("users/register", userData);
       return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (credentials) => {
    try {
       const response =
           await API.post("users/login", credentials);
        console.log(response.data);
       return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProfile = async () => {
    try {
       const response = await API.get("users/profile");
       return response.data; 
    } catch (error) {
        throw error.response.data;
    }
};