import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(
    config => {
        localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
)

export default API;