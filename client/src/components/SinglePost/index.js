import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { getPostById } from '../../actions/postActions';
import ContainerCentered from '../common/ContainerCentered';
import { Container } from '../common/ui';
import Post from '../Post';
import Spinner from '../common/Spinner';
import CTA from '../common/CTA';

class SinglePost extends Component {
    componentWillMount() {
        const { postList } = this.props;
        const { id } = this.props.match.params;
        if (typeof postList.posts.byId[id] === 'undefined')
            this.props.getPostById(this.props.match.params.id);
    }

    render() {
        const { postList } = this.props;
        const { id } = this.props.match.params;
        const post = postList.posts.byId[id];

        if (postList.isLoading) {
            return <Spinner />;
        }

        if (typeof post === 'undefined')
            return (
                <div>
                    <Helmet>
                        <title>MERNstagram - Post Not Found</title>
                    </Helmet>
                    <ContainerCentered>
                        <CTA faIcon="far fa-frown" text="Post Not Found" />
                    </ContainerCentered>
                </div>
            );

        const comments = postList.comments.filter(comment => {
            return comment.post.toString() === post._id.toString();
        });
        return (
            <div>
                <Helmet>
                    <title>MERNstagram - {post.description}</title>
                </Helmet>
                <Container withPadding>
                    <Post post={post} comments={comments} />
                </Container>
            </div>
        );
    }
}

SinglePost.propTypes = {
    getPostById: PropTypes.func.isRequired,
    postList: PropTypes.object.isRequired
};

export default connect(
    ({ postList }) => ({ postList }),
    { getPostById }
)(SinglePost);
