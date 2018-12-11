import jwtDecode from 'jwt-decode';
import userService from '../services/userService';
import http from '../services/http';
import {
    USER_REQUEST,
    SET_CURRENT_USER,
    UPDATE_USER,
    USER_DONE
} from './types';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setUserLoading = () => ({ type: USER_REQUEST });
export const clearUserLoading = () => ({ type: USER_DONE });

// --- Login
export const loginUser = (userData, history) => async dispatch => {
    dispatch(setUserLoading());

    try {
        const token = await userService.login(userData);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
        history.replace('/');
    } catch (err) {
        dispatch(setCurrentUser({}));
    }
};

// --- Logout
export const logoutUser = () => {
    localStorage.removeItem('token');
    http.setAuthToken(null);
    return setCurrentUser({});
};

// --- Sign Up
export const signUpUser = (userData, history) => async dispatch => {
    dispatch(setUserLoading());

    try {
        const token = await userService.signUp(userData);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
        history.replace('/');
    } catch (err) {
        dispatch(setCurrentUser({}));
    }
};

// --- Update User
export const updateUser = (userData, history) => async dispatch => {
    dispatch(setUserLoading());

    try {
        const { user, token } = await userService.update(userData);
        localStorage.setItem('token', token);
        dispatch({ type: UPDATE_USER, payload: user });
        history.push(`/profile/${userData.username}`);
    } catch (err) {
        dispatch(clearUserLoading());
    }
};
