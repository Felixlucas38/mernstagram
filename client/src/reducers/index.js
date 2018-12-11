import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import postListReducer from './postListReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    postList: postListReducer,
    errors: errorReducer,
    form: formReducer
});
