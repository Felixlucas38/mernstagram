import { POSTS_REQUEST, POSTS_DONE, GET_POST } from '../actions/types';

const initialState = {
    isLoading: false,
    data: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case POSTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case POSTS_DONE:
            return {
                ...state,
                isLoading: false
            };

        case GET_POST:
            return {
                ...state,
                isLoading: false,
                data: payload
            };

        default:
            return state;
    }
};
