import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container } from '../common/ui';
import { getPostsUserFeed } from '../../actions/postActions';
import Post from '../Post';
import ContainerCentered from '../common/ContainerCentered';
import CTA from '../common/CTA';
import Spinner from '../common/Spinner';

class Home extends Component {
    componentDidMount() {
        this.props.getPostsUserFeed();
    }

    render() {
        const { postList } = this.props;

        let content;

        if (
            postList.posts &&
            postList.posts.allIds &&
            postList.posts.allIds.length > 0
        ) {
            content = (
                <Container withPadding>
                    {postList.posts.allIds.map(postId => {
                        const post = postList.posts.byId[postId];

                        const comments = postList.comments.filter(
                            comment =>
                                comment.post.toString() === postId.toString()
                        );

                        return (
                            <Post
                                key={post._id}
                                post={post}
                                comments={comments}
                            />
                        );
                    })}
                </Container>
            );
        } else {
            content = (
                <ContainerCentered>
                    <CTA
                        faIcon="fas fa-globe-americas"
                        text="Explore and start connecting"
                        to="/explore"
                        btnText="Explore"
                    />
                </ContainerCentered>
            );
        }

        if (postList.isLoading) return <Spinner />;

        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Home</title>
                </Helmet>
                <Container>{content}</Container>
            </div>
        );
    }
}

Home.propTypes = {
    postList: PropTypes.object.isRequired
};

export default connect(
    ({ postList }) => ({ postList }),
    { getPostsUserFeed }
)(Home);
