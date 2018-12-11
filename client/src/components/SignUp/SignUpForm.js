import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { FormError } from '../common/ui';

class SignUpForm extends Component {
    render() {
        const { handleSubmit, errors, isLoading } = this.props;

        return (
            <form onSubmit={handleSubmit} noValidate spellCheck={false}>
                <Field
                    name="name"
                    label="Name"
                    component={TextField}
                    type="text"
                    error={errors.name}
                />
                <Field
                    name="username"
                    label="Username"
                    component={TextField}
                    type="text"
                    error={errors.username}
                />
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
                <Field
                    name="password2"
                    label="Confirm password"
                    component={TextField}
                    type="password"
                    error={errors.password2}
                />
                <Button isLoading={isLoading} type="submit" primary>
                    Sign Up
                </Button>
                {errors._error && <FormError>{errors._error}</FormError>}
            </form>
        );
    }
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

SignUpForm = reduxForm({
    form: 'signup'
})(SignUpForm);

export default SignUpForm;
