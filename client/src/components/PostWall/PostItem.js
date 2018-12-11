import React from 'react';
import PropTypes from 'prop-types';
import { PostItemContainer } from './style';
import { withRouter } from 'react-router-dom';
import placeholderImage from '../../assets/placeholder.png';

const PostItem = ({ post, history }) => {
    return (
        <PostItemContainer
            onClick={() => history.push(`/post/${post._id}`)}
            style={{
                backgroundImage: `url(${
                    post.imageURL
                }), url(${placeholderImage})`
            }}
        >
            <div>
                <div>
                    <span>
                        <i className="fas fa-heart" />{' '}
                        {post.likes && post.likes.length}
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        <i className="fas fa-comment" />{' '}
                        {post.comments && post.comments.length}
                    </span>
                </div>
            </div>
        </PostItemContainer>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};

export default withRouter(PostItem);
