import styled from 'styled-components';

// --- CONTAINER
export const Container = styled.div`
    max-width: 95rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    ${({ withPadding }) => withPadding && `padding: 9rem 1.5rem 2rem 1.5rem`}

    @media(max-width: 580px) {
        padding: 0 0.5rem;

        ${({ withPadding }) => withPadding && `padding: 9rem .5rem 6rem .5rem`}
    }
`;

// --- BOX
export const Box = styled.div`
    background-color: #fff;
    border: 1px solid #e6e6e6;
    width: 100%;
    max-width: 35rem;
    padding: 1.5rem 3rem;
    text-align: center;
    font-size: 1.2rem;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

// --- LOGO
export const Logo = styled.div`
    font-family: 'Baloo', sans-serif;
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 1rem;
    color: #222;

    ${({ small }) =>
        small &&
        `
        font-size: 2.5rem;
        margin-bottom: 0;
    `}

    &::before {
        display: block;
        content: 'MERNstagram';
    }
`;

// --- TITLE
export const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
`;

// --- ICON
export const FaIcon = styled.div``;

// --- INPUT
export const InputGroup = styled.div`
    position: relative;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }

    & label {
        & span {
            position: absolute;
            top: 1.3rem;
            left: 1.3rem;
            font-size: 1rem;
            color: #999;
            transition: 0.2s;
        }
    }

    & input,
    & textarea {
        display: block;
        width: 100%;
        background-color: #fafafa;
        border: 1px solid #efefef;
        border-radius: 4px;
        font-size: 1.2rem;
    }

    & input {
        height: 3.6rem;
        line-height: 2rem;
        padding: 0 1rem;
    }

    & textarea {
        line-height: 1.4;
        resize: none;
        height: 8rem;
        padding: 1rem 1rem 0 1rem;
    }

    ${({ dirty }) =>
        dirty &&
        `
        & label {
            & span {
                transform: translate(-2px, -7px);
                font-size: .8rem;
            }
        }

        & input {
            padding: 1.2rem 1rem 0 1rem;
        }

        & textarea {
            padding: 1.5rem 1rem 0 1rem;
        }
        
    `}
`;

export const InputError = styled.div`
    color: #ed4956;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 6px;
    text-align: left;
`;

export const FormError = styled.div`
    width: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 0;
    text-align: center;
    color: #ed4956;
`;
