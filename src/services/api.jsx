import axios from 'axios';

// Backend API එකේ base URL එක
const API = axios.create({
    baseURL: 'http://localhost:5000/api/', // ඔයාගේ backend URL එක
});

// Axios Interceptor
// මේකෙන්, හැම request එකක්ම යන්න කලින්, token එකක් තියෙනවද බලලා, header එකට දානවා.
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;