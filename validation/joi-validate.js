const Joi = require('joi');

module.exports = (data, schema) => {
    const { error } = Joi.validate(data, schema, {
        abortEarly: false,
        allowUnknown: true
    });

    if (!error) return null;

    return error.details.reduce((errors, err) => {
        // --- Format Joi Error Message
        let message = err.message.split('"');
        message = `This field ${message[message.length - 1].trim()}`;

        errors[err.context.key] = message;

        return errors;
    }, {});
};
