import styled from 'styled-components';

export const Slogan = styled.h1`
    font-size: 1.4rem;
    font-weight: 400;
    color: #999;
    line-height: 1.4;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 2rem;
`;

export const ButtonGroup = styled.div`
    & > div {
        display: inline-block;
        font-size: 0;
        width: calc((100% - 2rem) / 3);

        &:not(:last-child) {
            margin-right: 1rem;
        }
    }
`;
