import http from './http';
// import { API_URL } from '../config.js';

const API_ENDPOINT = `/api/profiles`;

// Get profile by username
const getByUsername = async username => {
    const {
        data: { profile }
    } = await http.get(`${API_ENDPOINT}/${username}`);
    return profile;
};

// Follow
const follow = async username => {
    return await http.post(`${API_ENDPOINT}/${username}/follow`);
};

// Unfollow
const unfollow = async username => {
    return await http.delete(`${API_ENDPOINT}/${username}/follow`);
};

export default {
    getByUsername,
    follow,
    unfollow
};
