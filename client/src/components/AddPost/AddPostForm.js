import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { FormError } from '../common/ui';

class AddPostForm extends Component {
    render() {
        const { handleSubmit, errors, isLoading } = this.props;

        return (
            <form onSubmit={handleSubmit} noValidate>
                <Field
                    name="imageURL"
                    label="Image URL"
                    component={TextField}
                    type="imageURL"
                    error={errors.imageURL}
                />
                <Field
                    name="description"
                    label="Description"
                    component={TextField}
                    type="description"
                    error={errors.description}
                />
                <Button isLoading={isLoading} primary type="submit">
                    Submit
                </Button>
                {errors.formError && <FormError>{errors.formError}</FormError>}
            </form>
        );
    }
}

AddPostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

AddPostForm = reduxForm({
    form: 'addPost',
    enableReinitialize: true
})(AddPostForm);

export default AddPostForm;
