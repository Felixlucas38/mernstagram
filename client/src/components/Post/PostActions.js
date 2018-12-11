import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PostActionsContainer } from './style';
import { addLikeToPost, removeLikeFromPost } from '../../actions/postActions';

const PostActions = ({
    postId,
    likes,
    username,
    auth,
    addLikeToPost,
    removeLikeFromPost
}) => {
    return (
        <PostActionsContainer>
            <div>
                {likes.some(like => like.toString() === auth.user.id) ? (
                    <button onClick={() => removeLikeFromPost(postId)}>
                        <i
                            className="fas fa-heart"
                            style={{ color: '#ED4956' }}
                        />
                    </button>
                ) : (
                    <button onClick={() => addLikeToPost(postId)}>
                        <i className="far fa-heart" />
                    </button>
                )}
                <button>{/* <i className="far fa-star" /> */}</button>
            </div>
            {likes.length > 0 && (
                <div>
                    {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                </div>
            )}
        </PostActionsContainer>
    );
};

PostActions.propTypes = {
    postId: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};

export default connect(
    ({ auth }) => ({ auth }),
    { addLikeToPost, removeLikeFromPost }
)(PostActions);
