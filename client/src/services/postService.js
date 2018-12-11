import http from './http';
import { API_URL } from '../config.json';

const API_ENDPOINT = `${API_URL}/posts`;

// Get posts
const getAll = async params => {
    let query = '';

    if (params && Object.keys(params).length > 0) {
        query =
            '?' +
            Object.keys(params)
                .map(key => `${key}=${params[key]}`)
                .join('&');
    }

    const { data } = await http.get(`${API_ENDPOINT}${query}`);
    return data;
};

// Get user feed posts
const getUserFeed = async params => {
    let query = '';

    if (params && Object.keys(params).length > 0) {
        query =
            '?' +
            Object.keys(params)
                .map(key => `${key}=${params[key]}`)
                .join('&');
    }

    const { data } = await http.get(`${API_ENDPOINT}/feed${query}`);
    return data;
};

// Get post by ID
const getById = async postId => {
    const { data } = await http.get(`${API_ENDPOINT}/${postId}`);
    return data;
};

// Create new post
const createPost = async postData => {
    const {
        data: { post }
    } = await http.post(`${API_ENDPOINT}`, postData);
    return post;
};

// Update post
const updatePost = async (postId, postData) => {
    const {data: { post } } = await http.put(`${API_ENDPOINT}/${postId}`, postData);
    return post;
};

// Delete post
const deletePost = async postId => {
    const post = await http.delete(`${API_ENDPOINT}/${postId}`);
    return post;
};

// Add post to favorites
const addFavorite = async postId => {
    return await http.post(`${API_ENDPOINT}/${postId}/favorite`);
};

// Remove post from favorites
const removeFavorite = async postId => {
    return await http.delete(`${API_ENDPOINT}/${postId}/favorite`);
};

// Add post to favorites
const addLike = async postId => {
    const { data } = await http.post(`${API_ENDPOINT}/${postId}/like`);
    return data;
};

// Remove post from favorites
const removeLike = async postId => {
    const { data } = await http.delete(`${API_ENDPOINT}/${postId}/like`);
    return data;
};

// Add post to favorites
const addComment = async (postId, commentData) => {
    const {
        data: { comment }
    } = await http.post(`${API_ENDPOINT}/${postId}/comments`, commentData);
    return comment;
};

// Remove post from favorites
const removeComment = async (postId, commentId) => {
    const { comment } = await http.delete(
        `${API_ENDPOINT}/${postId}/comments/${commentId}`
    );
    return comment;
};

export default {
    getAll,
    getUserFeed,
    getById,
    createPost,
    updatePost,
    deletePost,
    addFavorite,
    removeFavorite,
    addLike,
    removeLike,
    addComment,
    removeComment
};
