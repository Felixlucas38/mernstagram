import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/errorActions';
import { loginUser } from '../../actions/userActions';
import LoginForm from './LoginForm';

// UI
import { Logo, Box } from '../common/ui';
import ContainerCentered from '../common/ContainerCentered';

class Login extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.replace('/');
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSubmit(values) {
        // If it's working, do nothing
        if (this.props.auth.isLoading) return;

        this.props.loginUser(values, this.props.history);
    }

    render() {
        const { auth, errors } = this.props;

        return (
            <div>
                <Helmet>
                    <title>MERNstagram - Login</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Logo />
                        <LoginForm
                            onSubmit={this.onSubmit.bind(this)}
                            errors={errors}
                            isLoading={auth.isLoading}
                        />
                    </Box>
                    <Box>
                        New to MERNstagram? <Link to="/signup">Sign Up</Link>
                    </Box>
                </ContainerCentered>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    ({ auth, errors }) => ({ auth, errors }),
    { loginUser, clearErrors }
)(Login);
