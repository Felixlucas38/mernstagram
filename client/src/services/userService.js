import http from './http';
import jwtDecode from 'jwt-decode';
// import { API_URL } from '../config.js';

const API_ENDPOINT = `/users`;

// Login
const login = async userData => {
    const {
        data: { token }
    } = await http.post(`${API_ENDPOINT}/login`, userData);
    localStorage.setItem('token', token);
    http.setAuthToken(token);
    return token;
};

// Get current user
const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        http.setAuthToken(token);
        return jwtDecode(token);
    } catch (error) {
        return {};
    }
};

// Sign Up
const signUp = async userData => {
    const {
        data: { token }
    } = await http.post(`${API_ENDPOINT}`, userData);
    localStorage.setItem('token', token);
    http.setAuthToken(token);
    return token;
};

// Update
const update = async userData => {
    const { data } = await http.put(`${API_ENDPOINT}`, userData);
    return data;
};

export default { login, getCurrentUser, signUp, update };
