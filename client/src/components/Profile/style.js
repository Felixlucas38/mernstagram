import styled from 'styled-components';

export const ProfileContainer = styled.div`
    max-width: 80rem;
`;

// --- Profile Header
export const ProfileHeaderContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 20rem;

    & > div {
        position: relative;
        &:first-child {
            flex: 1 0 30%;
        }

        &:last-child {
            flex: 1 0 70%;
        }
    }

    @media (max-width: 700px) {
        min-height: initial;

        & > div {
            position: relative;

            &:first-child {
                flex: 1 0 100%;
            }

            &:last-child {
                flex: 1 0 100%;
            }
        }
    }
`;

export const ProfileAvatarWrapper = styled.div`
    & img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 15rem;
        border-radius: 100px;
        border: 1px solid #efefef;

        @media (max-width: 700px) {
            display: block;
            position: static;
            width: 50%;
            max-width: 18rem;
            transform: none;
            margin: 0 auto 1rem auto;
        }
    }
`;

export const ProfileInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;

    & > * {
        display: block;
        margin-bottom: 2rem;
    }

    & h3 {
        font-size: 1.8rem;
        font-weight: 400;
    }

    & button,
    & a:link,
    & a:visited {
        max-width: 12rem;
    }

    & ul {
        list-style: none;
        font-size: 0;

        & li {
            display: inline-block;
            font-size: 1.4rem;

            &:not(:last-child) {
                margin-right: 2rem;
            }
        }
    }

    @media (max-width: 700px) {
        display: block;
        position: static;
        width: 100%;
        transform: none;
        max-width: 50rem;
        margin: 0 auto;
        font-size: 1.2rem;
        text-align: center;

        & > * {
            margin-bottom: 1.2rem;
        }

        & button {
            margin: 0 auto;
        }
    }
`;

// --- Profile Tabs
export const ProfileTabsContainer = styled.div`
    border-top: 1px solid #efefef;
`;

export const ProfileTabsOptions = styled.div`
    display: flex;
    max-width: 60rem;
    margin: 0 auto;

    & > a {
        &:link,
        &:visited {
            display: inline-block;
            flex: 1;
            color: #999;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            line-height: 4rem;
            border-top: 1px solid transparent;
            transform: translateY(-1px);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
    }

    @media (max-width: 480px) {
        & > a {
            &:link,
            &:visited {
                font-size: 0.8rem;
                line-height: 3rem;
            }
        }
    }
`;
