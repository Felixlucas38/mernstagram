import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddPostForm from './AddPostForm';
import ContainerCentered from '../common/ContainerCentered';
import { Box, Title } from '../common/ui';
import { createPost } from '../../actions/postActions';

class AddPost extends Component {
    onSubmit(values) {
        this.props.createPost(values, this.props.history);
    }

    render() {
        const { postList, errors } = this.props;
        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Add Post</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Title>Post</Title>
                        <AddPostForm
                            errors={errors}
                            onSubmit={this.onSubmit.bind(this)}
                            isLoading={postList.isLoading}
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
    createPost: PropTypes.func.isRequired
};

export default connect(
    ({ postList, errors }) => ({ postList, errors }),
    { createPost }
)(AddPost);
