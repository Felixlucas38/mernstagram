import {
    SET_CURRENT_USER,
    USER_REQUEST,
    UPDATE_USER,
    USER_DONE
} from '../actions/types';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case USER_DONE:
            return {
                ...state,
                isLoading: false
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: payload && Object.keys(payload).length > 0,
                user: payload
            };

        case UPDATE_USER:
            return {
                ...state,
                isLoading: false,
                user: { ...state.user, ...payload }
            };

        default:
            return state;
    }
};
