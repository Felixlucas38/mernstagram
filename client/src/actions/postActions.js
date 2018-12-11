import postService from '../services/postService';
import {
    POSTS_REQUEST,
    POSTS_DONE,
    GET_POSTS,
    GET_POST,
    FAVORITE_POST,
    UNLIKE_POST,
    LIKE_POST,
    UNFAVORITE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

export const setPostLoading = () => ({ type: POSTS_REQUEST });
export const clearPostLoading = () => ({ type: POSTS_DONE });

// Get all posts (Explore)
export const getPosts = params => async dispatch => {
    dispatch(setPostLoading());

    try {
        const data = await postService.getAll(params ? params : {});
        dispatch({ type: GET_POSTS, payload: data });
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Get user feed (Home)
export const getPostsUserFeed = params => async dispatch => {
    dispatch(setPostLoading());

    try {
        const data = await postService.getUserFeed(params ? params : {});
        dispatch({ type: GET_POSTS, payload: data });
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Get post by ID (Single Post)
export const getPostById = id => async dispatch => {
    dispatch(setPostLoading());

    try {
        const { post, comments } = await postService.getById(id);
        dispatch({ type: GET_POST, payload: { post, comments } });
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Create post
export const createPost = (postData, history) => async dispatch => {
    dispatch(setPostLoading());

    try {
        await postService.createPost(postData);
        dispatch(clearPostLoading());
        history.push('/profile');
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Update post
export const updatePost = (postId, postData, history) => async dispatch => {
    dispatch(setPostLoading());

    try {
        await postService.updatePost(postId, postData);
        dispatch(clearPostLoading());
        history.push('/profile');
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Delete post
export const deletePost = (postId, history) => async dispatch => {
    dispatch(setPostLoading());

    try {
        await postService.deletePost(postId);
        dispatch(clearPostLoading());
        history.push('/profile');
    } catch (err) {
        dispatch(clearPostLoading());
    }
};

// Add to favorites
export const addPostToFavorites = postId => async dispatch => {
    try {
        await postService.addFavorite(postId);
        dispatch({ type: FAVORITE_POST, payload: postId });
    } catch (err) {}
};

// Remove from favorites
export const removePostFromFavorites = postId => async dispatch => {
    try {
        await postService.removeFavorite(postId);
        dispatch({ type: UNFAVORITE_POST, payload: postId });
    } catch (err) {}
};

// Like post
export const addLikeToPost = postId => async dispatch => {
    try {
        const { userId } = await postService.addLike(postId);
        dispatch({ type: LIKE_POST, payload: { userId, postId } });
    } catch (err) {}
};

// Unlike post
export const removeLikeFromPost = postId => async dispatch => {
    try {
        const { userId } = await postService.removeLike(postId);
        dispatch({ type: UNLIKE_POST, payload: { userId, postId } });
    } catch (err) {}
};

// Add Comment
export const addCommentToPost = (postId, commentData) => async dispatch => {
    try {
        const comment = await postService.addComment(postId, commentData);
        dispatch({ type: ADD_COMMENT, payload: comment });
    } catch (err) {}
};

// Delete comment
export const removeCommentFromPost = (postId, commentId) => async dispatch => {
    try {
        await postService.removeComment(postId, commentId);
        dispatch({ type: REMOVE_COMMENT, payload: commentId });
    } catch (err) {}
};
