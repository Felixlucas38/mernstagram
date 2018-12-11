import React from 'react';
import PropTypes from 'prop-types';
import { PostWallContainer } from './style';
import PostItem from './PostItem';
import CTA from '../common/CTA';

const PostWall = ({ postList }) => {
    if (postList.posts.allIds.length === 0) {
        return (
            <div style={{ padding: '3rem' }}>
                <CTA
                    faIcon="far fa-grin-beam-sweat"
                    text="Nothing to see here... yet"
                />
            </div>
        );
    }

    return (
        <PostWallContainer>
            {postList.posts.allIds.map(postId => {
                const post = postList.posts.byId[postId];

                return <PostItem key={post._id} post={post} />;
            })}
        </PostWallContainer>
    );
};

PostWall.propTypes = {
    postList: PropTypes.object.isRequired
};

export default PostWall;
