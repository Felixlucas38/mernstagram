import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Avatar from './Avatar';
import CTA from './CTA';

const UserListContainer = styled.div`
    padding: 2rem 0;
    max-width: 45rem;
    margin: 0 auto;
`;

const UserItemContainer = styled.div`
    display: flex;

    &:not(:last-child) {
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #efefef;
    }

    & > div {
        /* border: 1px solid red; */

        &:last-child {
            flex: 0 0 8rem;

            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &:nth-child(2) {
            flex-grow: 1;
            padding-left: 1rem;

            display: flex;
            flex-direction: column;
            justify-content: center;

            & > div {
                width: 100%;
            }
        }
    }

    & img {
        display: block;
        width: 4rem;
        height: 4rem;
        background-color: #efefef;
        border-radius: 100px;
        border: 1px solid #efefef;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    & h4,
    & span {
        max-width: 20rem;
        font-size: 1.2rem;
        line-height: 1.6rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 480px) {
        & h4,
        & span {
            max-width: 13rem;
        }
    }
`;

const UserItem = ({ avatar, name, username }) => (
    <UserItemContainer>
        <div>
            <Avatar avatar={avatar} />
        </div>
        <div>
            <div>
                <h4>{name}</h4>
                <span>{username}</span>
            </div>
        </div>
        <div>
            <Button link={1} to={`/profile/${username}`}>
                Profile
            </Button>
        </div>
    </UserItemContainer>
);

const UserList = ({ userList }) => {
    if (!userList || userList.length === 0)
        return (
            <div style={{ padding: '3rem' }}>
                <CTA
                    faIcon="far fa-grin-beam-sweat"
                    text="Nothing to see here... yet"
                />
            </div>
        );

    return (
        <UserListContainer>
            {userList.length > 0 &&
                userList.map(user => (
                    <UserItem
                        key={user._id}
                        avatar={user.avatar}
                        name={user.name}
                        username={user.username}
                    />
                ))}
        </UserListContainer>
    );
};

UserList.propTypes = {
    userList: PropTypes.array.isRequired
};

export default UserList;
