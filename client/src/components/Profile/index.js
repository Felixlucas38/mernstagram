import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
    getProfile,
    followUser,
    unfollowUser
} from '../../actions/profileActions';
import { getPosts } from '../../actions/postActions';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import { Container } from '../common/ui';
import { setCurrentUser, logoutUser } from '../../actions/userActions';
import Spinner from '../common/Spinner';

class Profile extends Component {
    componentWillMount() {
        if (this.props.match.params.username) {
            this.props.getProfile(this.props.match.params.username);
            this.props.getPosts({
                author: this.props.match.params.username,
                limit: 99999
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.match.params.username !== prevProps.match.params.username
        ) {
            this.props.getProfile(this.props.match.params.username);
            this.props.getPosts({
                author: this.props.match.params.username,
                limit: 99999
            });
        }
    }

    onFollow() {
        const { username } = this.props.match.params;
        this.props.followUser(username);
    }

    onUnfollow() {
        const { username } = this.props.match.params;
        this.props.unfollowUser(username);
    }

    render() {
        const { auth, profile, postList } = this.props;

        if (profile.isLoading) {
            return <Spinner />;
        }

        return (
            <div>
                <Helmet>
                    <title>{`MERNstagram - ${profile.data.username}`}</title>
                </Helmet>
                <Container withPadding>
                    <ProfileHeader
                        currentUser={auth.user}
                        profile={profile.data}
                        onFollow={this.onFollow.bind(this)}
                        onUnfollow={this.onUnfollow.bind(this)}
                        onLogout={() => this.props.logoutUser()}
                        postsCount={
                            postList.postsCount ? postList.postsCount : 0
                        }
                    />
                    <ProfileTabs
                        user={{ username: this.props.match.params.username }}
                        postList={postList}
                        following={profile.data.following || []}
                        followers={profile.data.followers || []}
                    />
                </Container>
            </div>
        );
    }
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postList: PropTypes.object.isRequired
};

export default connect(
    ({ auth, profile, postList }) => ({ auth, profile, postList }),
    {
        getProfile,
        getPosts,
        followUser,
        unfollowUser,
        setCurrentUser,
        logoutUser
    }
)(Profile);
