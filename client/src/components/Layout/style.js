import styled from 'styled-components';

// --- Top Bar
export const TopBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 3rem;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    z-index: 1000;
    margin-bottom: 4rem;

    & > div {
        max-width: 95rem;
        margin: 0 auto;
        min-height: 2rem;

        &::after {
            display: block;
            content: '';
            clear: both;
        }

        & > div:first-child {
            float: left;
        }

        & > div:last-child {
            float: right;
            font-size: 2rem;
        }
    }

    & a:link,
    & a:visited {
        display: inline-block;
        color: #222;
        transform: translateY(5px);

        &:not(:last-child) {
            margin-right: 3rem;
        }
    }

    @media (max-width: 480px) {
        padding: 0.5rem 2rem;
        text-align: center;

        & > div {
            & > div:first-child {
                float: none;
            }

            & > div:last-child {
                display: none;
            }
        }
    }
`;

// --- Mobile Actions
export const MobileActionsContainer = styled.div`
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    border-top: 1px solid #efefef;

    & > div {
        display: inline-block;
        flex-basis: calc(100% / 4);
        width: calc(100% / 4);
    }

    & a:link,
    & a:visited {
        display: block;
        width: 100%;
        color: #222;
        font-size: 2.4rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
    }

    @media (max-width: 480px) {
        display: flex;
    }
`;
