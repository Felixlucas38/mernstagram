import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PostBodyContainer } from './style';
import Comment from './Comment';
import CommentBox from './CommentBox';
import { addCommentToPost } from '../../actions/postActions';

const PostBody = ({
    username,
    description,
    comments,
    postId,
    addCommentToPost
}) => {
    const onComment = e => {
        e.preventDefault();
        const text = e.target['comment'].value;

        if (!text) return;

        addCommentToPost(postId, { text });
        e.target.reset();
    };
    return (
        <PostBodyContainer>
            <Comment
                username={username}
                text={description}
                isDescription={true}
            />
            {comments.map(comment => (
                <Comment
                    key={comment._id}
                    commentId={comment._id}
                    postId={postId}
                    username={comment.author.username}
                    text={comment.text}
                />
            ))}
            <CommentBox onComment={onComment} />
        </PostBodyContainer>
    );
};

PostBody.propTypes = {
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default connect(
    null,
    { addCommentToPost }
)(PostBody);
