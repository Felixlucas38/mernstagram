import styled from 'styled-components';

export const PostContainer = styled.div`
    background-color: #fff;
    border: 1px solid #efefef;
    max-width: 60rem;
    margin: 0 auto;

    &:not(:last-child) {
        margin-bottom: 3rem;
    }
`;

export const PostHeaderContainer = styled.div`
    position: relative;
    padding: 1.2rem 1.2rem 1.2rem 6rem;

    & img {
        position: absolute;
        top: 50%;
        left: 1.2rem;
        transform: translateY(-50%);
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 100px;
        border: 1px solid #efefef;
    }

    & a:link,
    & a:visited {
        color: #222;
        font-size: 1.4rem;

        & > span:first-child {
            font-weight: 600;
        }

        & > span:last-child {
            font-size: 1.2rem;
        }
    }
`;

export const PostImageContainer = styled.div`
    & img {
        display: block;
        width: 100%;
    }
`;

export const PostActionsContainer = styled.div`
    position: relative;
    padding: 0.5rem 1.2rem;

    & > div {
        &:not(:last-child) {
            margin-bottom: 4px;
        }

        &:last-child {
            font-size: 1.3rem;
            font-weight: 600;
        }
    }

    & button {
        font-size: 2rem;
        display: inline-block;
        color: #222;
        margin-top: 3px;
        border: none;
        background: none;
        cursor: pointer;

        &:not(:last-child) {
            margin-right: 1.5rem;
        }

        &:last-child {
            float: right;
        }
    }
`;

export const PostBodyContainer = styled.div`
    padding: 1rem 1.2rem;
`;

export const CommentContainer = styled.div`
    position: relative;
    font-size: 1.2rem;
    line-height: 1.35;
    overflow-wrap: break-word;
    padding-right: 10px;

    &:not(:last-child) {
        margin-bottom: 6px;
    }

    & a:link,
    & a:visited {
        color: #222;
        font-weight: 600;
        margin-right: 5px;
    }

    & span {
        font-weight: 400;
    }

    & button {
        position: absolute;
        top: 2px;
        right: 0;
        background: none;
        border: none;
        cursor: pointer;
        color: #222;
        font-size: 10px;
    }
`;

export const CommentBoxContainer = styled.form`
    position: relative;
    margin-top: 1rem;
    padding-top: 1rem;
    padding-right: 4rem;
    border-top: 1px solid #efefef;

    & textarea {
        display: block;
        width: 100%;
        resize: none;
        border: none;
        height: 3rem;
        font-size: 1.2rem;

        &::placeholder {
            font-size: 1.2rem;
        }
    }

    & button {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        font-size: 2rem;
        display: block;
        color: #222;
        margin-top: 3px;
        border: none;
        background: none;
        cursor: pointer;
    }
`;

export const PostHeaderOptions = styled.div`
    position: relative;
    float: right;

    & button {
        background: none;
        border: none;
        cursor: pointer;
    }

    .options {
        position: absolute;
        bottom: -58px;
        right: 0;
        background: #fff;
        border: 1px solid #efefef;
        width: 6rem;

        & button,
        & a:link,
        & a:visited {
            font-size: 1.2rem;
            display: block;
            padding: 0.5rem 1rem;
            width: 100%;
            text-align: left;

            &:not(:last-child) {
                border-bottom: 1px solid #efefef;
            }
        }
    }
`;
