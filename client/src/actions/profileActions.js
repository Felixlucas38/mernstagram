import profileService from '../services/profileService';
import {
    PROFILE_REQUEST,
    SET_CURRENT_PROFILE,
    FOLLOW_USER,
    UNFOLLOW_USER
} from './types';

export const setProfileLoading = () => ({ type: PROFILE_REQUEST });

export const getProfile = username => async dispatch => {
    dispatch(setProfileLoading());

    try {
        const profile = await profileService.getByUsername(username);
        return dispatch({ type: SET_CURRENT_PROFILE, payload: profile });
    } catch (err) {}
};

export const followUser = username => async dispatch => {
    try {
        await profileService.follow(username);
        dispatch({ type: FOLLOW_USER });
    } catch (err) {}
};

export const unfollowUser = username => async dispatch => {
    try {
        await profileService.unfollow(username);
        dispatch({ type: UNFOLLOW_USER });
    } catch (err) {}
};
