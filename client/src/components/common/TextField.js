import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputError } from './ui';

const TextField = field => {
    return (
        <InputGroup dirty={field.input.value !== ''}>
            <label>
                <span>{field.label}</span>
                <input spellCheck={false} {...field.input} type={field.type} />
            </label>
            {field.error && <InputError>{field.error}</InputError>}
        </InputGroup>
    );
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

TextField.defaultProps = {
    type: 'text'
};

export default TextField;
