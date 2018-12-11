import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const CTAContainer = styled.div`
    text-align: center;

    & i {
        font-size: 6rem;
        margin-bottom: 1rem;
    }

    & h3 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }
`;

const CTA = ({ faIcon, text, to, btnText }) => {
    return (
        <CTAContainer>
            <i className={faIcon} />
            <h3>{text}</h3>
            {to && btnText && (
                <Button link={1} to={to}>
                    {btnText}
                </Button>
            )}
        </CTAContainer>
    );
};

CTA.propTypes = {
    faIcon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
    btnText: PropTypes.string
};

export default CTA;
