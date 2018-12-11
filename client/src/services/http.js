import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store';
import { GET_ERRORS } from '../actions/types';

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (expectedError) {
        const { errors } = error.response.data;
        if (error.response.status === 401 || error.response.status === 403) {
            // Unauthorized and Forbidden
            store.dispatch({
                type: GET_ERRORS,
                payload: { _error: 'Access Denied' }
            });
        } else {
            // Other expected errors
            store.dispatch({ type: GET_ERRORS, payload: errors || {} });
        }
    } else {
        toast.error('An unexpected error occurrred.');
    }

    return Promise.reject(error);
});

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setAuthToken
};
