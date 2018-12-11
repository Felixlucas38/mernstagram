import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import CTA from './CTA';

const Avatar = ({ avatar }) => {
    return (
        <Img
            src={
                avatar ||
                'data:image/png;base64,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'
            }
            alt="Avatar"
            unloader={() => (
                <div style={{ background: '#efefef', padding: '4rem 2rem' }}>
                    <CTA />
                </div>
            )}
        />
    );
};

Avatar.propTypes = {
    avatar: PropTypes.string
};

export default Avatar;
