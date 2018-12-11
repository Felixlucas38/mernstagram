import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { FormError } from '../common/ui';

class LoginForm extends Component {
    render() {
        const { handleSubmit, errors, isLoading } = this.props;

        return (
            <form onSubmit={handleSubmit} noValidate spellCheck={false}>
                <Field
                    name="email"
                    label="E-mail"
                    component={TextField}
                    type="email"
                    error={errors.email}
                />
                <Field
                    name="password"
                    label="Password"
                    component={TextField}
                    type="password"
                    error={errors.password}
                />
                <Button isLoading={isLoading} type="submit" primary>
                    Login
                </Button>
                {errors._error && <FormError>{errors._error}</FormError>}
            </form>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;
