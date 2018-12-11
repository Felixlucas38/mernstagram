import React from 'react';
import PropTypes from 'prop-types';
import { PostContainer } from './style';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostBody from './PostBody';

const Post = ({ post, comments }) => {
    const { author } = post;
    return (
        <PostContainer>
            <PostHeader
                postId={post._id}
                name={author.name}
                username={author.username}
                avatar={author.avatar}
            />
            <PostImage image={post.imageURL} />
            <PostActions
                postId={post._id}
                likes={post.likes}
                username={author.username}
            />
            <PostBody
                username={author.username}
                description={post.description}
                comments={comments}
                postId={post._id}
            />
        </PostContainer>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
};

export default Post;
