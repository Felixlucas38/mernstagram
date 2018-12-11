import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { PostHeaderContainer, PostHeaderOptions } from './style';
import Avatar from '../common/Avatar';
import { deletePost } from '../../actions/postActions';

class PostHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionsOpen: false
        };
    }

    render() {
        const { auth, postId, name, username, avatar } = this.props;
        return (
            <PostHeaderContainer>
                {auth.user.username === username && (
                    <PostHeaderOptions style={{ float: 'right' }}>
                        <button
                            onClick={() =>
                                this.setState(prevState => ({
                                    isOptionsOpen: !prevState.isOptionsOpen
                                }))
                            }
                        >
                            <i className="fas fa-ellipsis-h" />
                        </button>
                        {this.state.isOptionsOpen && (
                            <div className="options">
                                <Link to={`/update-post/${postId}`}>Edit</Link>
                                <button
                                    onClick={() => {
                                        const shouldDeletePost = window.confirm(
                                            "Are you sure you want to delete this post? This action CAN'T be undone."
                                        );
                                        if (shouldDeletePost) {
                                            this.props.deletePost(
                                                postId,
                                                this.props.history
                                            );
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </PostHeaderOptions>
                )}
                <Avatar avatar={avatar} />
                <Link to={`/profile/${username}`}>
                    <span>{name}</span>
                    <br />
                    <span>@{username}</span>
                </Link>
            </PostHeaderContainer>
        );
    }
}

PostHeader.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
};

export default connect(
    ({ auth }) => ({ auth }),
    { deletePost }
)(withRouter(PostHeader));
