import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddPostForm from './AddPostForm';
import ContainerCentered from '../common/ContainerCentered';
import { Box, Title } from '../common/ui';
import { updatePost, getPostById } from '../../actions/postActions';
import Spinner from '../common/Spinner';

class AddPost extends Component {
    componentWillMount() {
        const { postList } = this.props;
        const { id } = this.props.match.params;
        if (this.props.match.params.id && !postList.posts.byId[id]) {
            this.props.getPostById(id);
        }
    }

    onSubmit(values) {
        if (this.props.match.params.id)
            this.props.updatePost(
                this.props.match.params.id,
                values,
                this.props.history
            );
    }

    render() {
        const { postList, errors } = this.props;
        const { id } = this.props.match.params;
        const post = postList.posts.byId[id];

        if (postList.isLoading || !post) {
            return <Spinner />;
        }

        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Edit Post</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Title>Post</Title>
                        <AddPostForm
                            errors={errors}
                            onSubmit={this.onSubmit.bind(this)}
                            isLoading={postList.isLoading}
                            initialValues={{
                                imageURL: post.imageURL,
                                description: post.description
                            }}
                        />
                    </Box>
                </ContainerCentered>
            </div>
        );
    }
}

AddPost.propTypes = {
    postList: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    getPostById: PropTypes.func.isRequired
};

export default connect(
    ({ postList, errors }) => ({ postList, errors }),
    { updatePost, getPostById }
)(AddPost);
