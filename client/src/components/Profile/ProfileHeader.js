import React from 'react';
import PropTypes from 'prop-types';
import {
    ProfileHeaderContainer,
    ProfileInfo,
    ProfileAvatarWrapper
} from './style';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

const ProfileHeader = ({
    currentUser,
    profile,
    postsCount,
    onFollow,
    onUnfollow,
    onLogout
}) => {
    return (
        <ProfileHeaderContainer>
            <div>
                <ProfileAvatarWrapper avatar={profile.avatar}>
                    <Avatar avatar={profile.avatar} />
                </ProfileAvatarWrapper>
            </div>
            <div>
                <ProfileInfo>
                    <div>
                        <h3>
                            <strong>{profile.name}</strong> @{profile.username}
                        </h3>
                    </div>
                    <div>
                        {profile.username === currentUser.username ? (
                            <div>
                                <Button link={1} to="/edit-profile">
                                    Edit Profile
                                </Button>{' '}
                                <Button onClick={onLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div>
                                {profile.followingUser ? (
                                    <Button onClick={onUnfollow}>
                                        <i className="fas fa-user-minus" />{' '}
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button primary onClick={onFollow}>
                                        <i className="fas fa-user-plus" />{' '}
                                        Follow
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        <ul>
                            <li>
                                <b>{postsCount}</b>{' '}
                                {postsCount === 1 ? 'post' : 'posts'}
                            </li>
                            <li>
                                <b>
                                    {profile.followers &&
                                        profile.followers.length}
                                </b>{' '}
                                followers
                            </li>
                            <li>
                                <b>
                                    {profile.following &&
                                        profile.following.length}
                                </b>{' '}
                                following
                            </li>
                        </ul>
                    </div>
                    {profile.bio && <div>{profile.bio}</div>}
                </ProfileInfo>
            </div>
        </ProfileHeaderContainer>
    );
};

ProfileHeader.propTypes = {
    currentUser: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postsCount: PropTypes.number.isRequired,
    onFollow: PropTypes.func.isRequired,
    onUnfollow: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default ProfileHeader;
