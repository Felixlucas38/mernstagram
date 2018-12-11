import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputError } from './ui';

const TextAreaField = field => {
    return (
        <InputGroup dirty={field.input.value !== ''}>
            <label>
                <span>{field.label}</span>
                <textarea spellCheck={false} {...field.input} />
            </label>
            {field.error && <InputError>{field.error}</InputError>}
        </InputGroup>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired
};

export default TextAreaField;
