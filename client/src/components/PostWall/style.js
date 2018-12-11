import styled from 'styled-components';

export const PostWallContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const PostItemContainer = styled.div`
    position: relative;
    display: inline-block;
    flex: 0 0 32%;
    padding-top: 30%;
    margin-bottom: 2%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #efefef;
    cursor: pointer;

    &:not(:nth-child(3n)) {
        margin-right: 2%;
    }

    & > div {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.35);
        font-size: 1.4rem;
        font-weight: 600;
        color: #fff;
        text-align: center;

        & > div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
        }
    }

    &:hover {
        & > div {
            opacity: 1;
        }
    }
`;
