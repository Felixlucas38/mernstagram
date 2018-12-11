import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CommentContainer } from './style';
import { removeCommentFromPost } from '../../actions/postActions';

const Comment = ({
    isDescription,
    auth,
    username,
    text,
    postId,
    commentId,
    removeCommentFromPost
}) => {
    return (
        <CommentContainer>
            <Link to={`/profile/${username}`}>{username}</Link>
            <span>{text}</span>
            {!isDescription && auth.user.username === username && (
                <button
                    onClick={() => {
                        if (
                            window.confirm(
                                "Are you sure you want to delete this comment? This action CAN'T be undone."
                            )
                        )
                            removeCommentFromPost(postId, commentId);
                    }}
                >
                    <i className="fas fa-times" />
                </button>
            )}
        </CommentContainer>
    );
};

Comment.propTypes = {
    isDescription: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    postId: PropTypes.string,
    commentId: PropTypes.string,
    removeCommentFromPost: PropTypes.func.isRequired
};

export default connect(
    ({ auth }) => ({ auth }),
    { removeCommentFromPost }
)(Comment);
