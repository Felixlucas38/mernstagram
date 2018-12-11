import {
    GET_POSTS,
    POSTS_REQUEST,
    DELETE_POST,
    POSTS_DONE,
    ADD_COMMENT,
    REMOVE_COMMENT,
    LIKE_POST,
    UNLIKE_POST,
    GET_POST
} from '../actions/types';

const initialState = {
    isLoading: false,
    posts: {
        byId: {},
        allIds: []
    },
    postsCount: 0,
    comments: []
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

        case GET_POSTS:
            return {
                ...state,
                isLoading: false,
                posts: {
                    byId: payload.posts.reduce((posts, post) => {
                        posts[post._id] = post;
                        return posts;
                    }, {}),
                    allIds: payload.posts.map(post => post._id)
                },
                postsCount: payload.postsCount,
                comments: payload.comments
            };

        case GET_POST:
            return {
                ...state,
                isLoading: false,
                posts: {
                    byId: {
                        ...state.posts.byId,
                        [payload.post._id]: payload.post
                    },
                    allIds: [...state.posts.allIds, payload.post._id]
                },
                postsCount: state.postsCount + 1,
                comments: [...state.comments, ...payload.comments]
            };

        // TO DO: Improve with Slice Reducer Composition
        case LIKE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [payload.postId]: {
                            ...state.posts.byId[payload.postId],
                            likes: [
                                ...state.posts.byId[payload.postId].likes,
                                payload.userId
                            ]
                        }
                    }
                }
            };

        // TO DO: Improve with Slice Reducer Composition
        case UNLIKE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [payload.postId]: {
                            ...state.posts.byId[payload.postId],
                            likes: state.posts.byId[
                                payload.postId
                            ].likes.filter(like => like !== payload.userId)
                        }
                    }
                }
            };

        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload]
            };

        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(
                    c => c._id.toString() !== payload.toString()
                )
            };

        // TO DO: delete post
        case DELETE_POST:
            return {
                ...state
            };

        default:
            return state;
    }
};
