import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { FormError } from '../common/ui';
import TextAreaField from '../common/TextAreaField';

class EditProfileForm extends Component {
    render() {
        const { handleSubmit, errors, isLoading } = this.props;

        return (
            <form onSubmit={handleSubmit} noValidate>
                <Field
                    name="name"
                    label="Name"
                    component={TextField}
                    type="name"
                    error={errors.name}
                />
                <Field
                    name="username"
                    label="Username"
                    component={TextField}
                    type="username"
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
                    name="avatar"
                    label="Avatar URL"
                    component={TextField}
                    type="avatar"
                    error={errors.avatar}
                />
                <Field
                    name="bio"
                    label="Bio"
                    component={TextAreaField}
                    type="bio"
                    error={errors.bio}
                />
                <Field
                    name="location"
                    label="Location"
                    component={TextField}
                    type="location"
                    error={errors.location}
                />
                <Field
                    name="website"
                    label="Your website"
                    component={TextField}
                    type="website"
                    error={errors.website}
                />
                <Button isLoading={isLoading} primary type="submit">
                    Submit
                </Button>
                {errors.formError && <FormError>{errors.formError}</FormError>}
            </form>
        );
    }
}

EditProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

EditProfileForm = reduxForm({
    form: 'editProfile',
    enableReinitialize: true
})(EditProfileForm);

export default EditProfileForm;
