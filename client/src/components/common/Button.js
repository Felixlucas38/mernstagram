import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import spinnerSvg from '../../assets/spinner-white.svg';

const Button = styled.button`
    &,
    &:link,
    &:visited {
        background-color: #fafafa;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        color: #222;
        cursor: pointer;
        display: inline-block;
        font-weight: 600;
        font-size: 1.4rem;
        height: 3rem;
        line-height: 2.9rem;
        text-align: center;
        width: 100%;

        ${({ primary }) =>
            primary &&
            `
            background-color: #3897f0;
            border: 1px solid transparent;
            color: #fff;
        `}

        & img {
            height: 3rem;
        }
    }
`;

const ButtonLink = Button.withComponent(Link);

export default ({ isLoading, children, link, ...rest }) => {
    const Base = link ? ButtonLink : Button;

    return (
        <Base {...rest}>
            {isLoading ? (
                <img src={spinnerSvg} alt="Loading..." />
            ) : (
                <span>{children}</span>
            )}
        </Base>
    );
};
