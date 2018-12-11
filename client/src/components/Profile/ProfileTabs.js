import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProfileTabsOptions, ProfileTabsContainer } from './style';
import PostWall from '../PostWall';
import UserList from '../common/UserList';

const Options = ({ username }) => (
    <ProfileTabsOptions>
        <NavLink
            exact
            activeStyle={{
                borderTop: '1px solid #222',
                color: '#222'
            }}
            to={`/profile/${username}`}
        >
            Posts
        </NavLink>
        <NavLink
            exact
            activeStyle={{
                borderTop: '1px solid #222',
                color: '#222'
            }}
            to={`/profile/${username}/followers`}
        >
            Followers
        </NavLink>
        <NavLink
            exact
            activeStyle={{
                borderTop: '1px solid #222',
                color: '#222'
            }}
            to={`/profile/${username}/following`}
        >
            Following
        </NavLink>
    </ProfileTabsOptions>
);

Options.propTypes = {
    username: PropTypes.string.isRequired
};

const ProfileTabs = ({ user, postList, following, followers }) => {
    return (
        <ProfileTabsContainer>
            <Options username={user.username} />
            <Switch>
                <Route
                    path={`/profile/${user.username}/followers`}
                    render={() => <UserList userList={followers} />}
                />
                <Route
                    path={`/profile/${user.username}/following`}
                    render={() => <UserList userList={following} />}
                />
                <Route render={() => <PostWall postList={postList} />} />
            </Switch>
        </ProfileTabsContainer>
    );
};

ProfileTabs.propTypes = {
    user: PropTypes.object.isRequired,
    postList: PropTypes.object.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired
};

export default ProfileTabs;
