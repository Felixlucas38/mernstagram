import React from 'react';
import PropTypes from 'prop-types';
import { CommentBoxContainer } from './style';

const CommentBox = ({ onComment }) => {
    return (
        <CommentBoxContainer onSubmit={onComment}>
            <textarea
                spellCheck={false}
                name="comment"
                placeholder="Add a comment..."
                maxLength="255"
            />
            <button type="submit">
                <i className="far fa-paper-plane" />
            </button>
        </CommentBoxContainer>
    );
};

CommentBox.propTypes = {
    onComment: PropTypes.func.isRequired
};

export default CommentBox;
