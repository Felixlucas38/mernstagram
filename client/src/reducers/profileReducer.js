import {
    SET_CURRENT_PROFILE,
    PROFILE_REQUEST,
    FOLLOW_USER,
    UNFOLLOW_USER
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case SET_CURRENT_PROFILE:
            return {
                isLoading: false,
                data: payload
            };

        case FOLLOW_USER:
            return {
                ...state,
                data: {
                    ...state.data,
                    followingUser: true
                }
            };

        case UNFOLLOW_USER:
            return {
                ...state,
                data: {
                    ...state.data,
                    followingUser: false
                }
            };

        default:
            return state;
    }
};
