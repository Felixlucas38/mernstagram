import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/errorActions';
import { signUpUser } from '../../actions/userActions';
import SignUpForm from './SignUpForm';

// UI
import { Box, Logo } from '../common/ui';
import ContainerCentered from '../common/ContainerCentered';

class SignUp extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.replace('/');
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSubmit(values) {
        // If it's working, do nothing
        if (this.props.auth.isLoading) return;

        this.props.signUpUser(values, this.props.history);
    }

    render() {
        const { auth, errors } = this.props;

        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Sign Up</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Logo />
                        <SignUpForm
                            onSubmit={this.onSubmit.bind(this)}
                            errors={errors}
                            isLoading={auth.isLoading}
                        />
                    </Box>
                    <Box>
                        Have an account? <Link to="/login">Sign In</Link>
                    </Box>
                </ContainerCentered>
            </div>
        );
    }
}

SignUp.propTypes = {
    signUpUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    ({ auth, errors }) => ({ auth, errors }),
    { signUpUser, clearErrors }
)(SignUp);
