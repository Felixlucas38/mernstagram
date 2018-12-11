import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import EditProfileForm from './EditProfileForm';
import ContainerCentered from '../common/ContainerCentered';
import { Box, Title } from '../common/ui';
import { updateUser } from '../../actions/userActions';

class EditProfile extends Component {
    onSubmit(values) {
        this.props.updateUser(values, this.props.history);
    }

    render() {
        const { auth, errors } = this.props;
        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Edit Profile</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Title>Edit Profile</Title>
                        <EditProfileForm
                            errors={errors}
                            onSubmit={this.onSubmit.bind(this)}
                            isLoading={auth.isLoading}
                            initialValues={auth.user}
                        />
                    </Box>
                </ContainerCentered>
            </div>
        );
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
};

export default connect(
    ({ auth, errors }) => ({ auth, errors }),
    { updateUser }
)(EditProfile);
