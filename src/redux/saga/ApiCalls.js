import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_PATHS from './ApiPaths';

const headers = {
    'Content-Type': 'application/json',
};

// Login API
export const LoginApi = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_PATHS.BASE_URL}${API_PATHS.LOGIN_API}`,
            { username, password, expiresInMins: 60 },
            { headers, withCredentials: true }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'An error occurred during login'
        );
    }
};

// Auth API 


export const fetchUserData = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('token');
        if (!accessToken) {
            throw new Error('No access token found. Please log in.');
        }
        const response = await axios.get(`${API_PATHS.BASE_URL}${API_PATHS.AUTH_API}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
};


//get ALL POST apI  'https://dummyjson.com/posts'

//refresh token api working on fectcvh
export const getAllPostApi = async () => {
    try {
        const response = await axios.get(`${API_PATHS.BASE_URL}${API_PATHS.ALL_POST_API}`, {
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
};



//refresh token api
export const refreshApi = async (refreshToken) => {
    const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: 60 }),
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }
    console.log(response, "refreshApi")
    return await response.json();
};
