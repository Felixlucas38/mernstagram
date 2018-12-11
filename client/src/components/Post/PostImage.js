import React from 'react';
import PropTypes from 'prop-types';
import { PostImageContainer } from './style';
import Img from 'react-image';
import CTA from '../common/CTA';

const PostImage = ({ image }) => {
    return (
        <PostImageContainer>
            <Img
                src={image}
                draggable={false}
                alt="Post"
                unloader={
                    <div
                        style={{ background: '#efefef', padding: '6rem 2rem' }}
                    >
                        <CTA
                            faIcon="far fa-frown"
                            text="Image couldn't be loaded"
                        />
                    </div>
                }
            />
            {/* <img draggable={false} src={image} alt="Post" /> */}
        </PostImageContainer>
    );
};

PostImage.propTypes = {
    image: PropTypes.string.isRequired
};

export default PostImage;
