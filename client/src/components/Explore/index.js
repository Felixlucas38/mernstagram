import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PostWall from '../PostWall';
import { Container } from '../common/ui';
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/Spinner';

class Explore extends Component {
    componentWillMount() {
        this.props.getPosts({ limit: 99999 });
    }

    render() {
        const { postList } = this.props;
        if (postList.isLoading) {
            return <Spinner />;
        }

        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Explore</title>
                </Helmet>
                <Container withPadding>
                    <PostWall postList={postList} />
                </Container>
            </div>
        );
    }
}

Explore.propTypes = {
    postList: PropTypes.object.isRequired
};

export default connect(
    ({ postList }) => ({ postList }),
    { getPosts }
)(Explore);
