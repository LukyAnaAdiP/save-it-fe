import axios from "axios"


const axiosInstance = axios.create({
    baseURL: '/api/v1',
    headers: {
        'ngrok-skip-browser-warning': 'any-value'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location = '/login';
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;