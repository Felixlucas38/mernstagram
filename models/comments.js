const mongoose = require('mongoose');
const Joi = require('joi');
const JoiValidate = require('../validation/joi-validate');
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        text: {
            type: String,
            minlength: 1,
            maxlength: 255,
            trim: true,
            required: true
        }
    },
    { timestamps: true }
);

// --- Methods
CommentSchema.methods.toCommentJSON = function() {
    return {
        id: this._id,
        author: this.author,
        post: this.post,
        text: this.text,
        createdAt: this.createdAt
    };
};

// --- Create model
const Comment = mongoose.model('Comment', CommentSchema);

// --- Validations
const validateComment = comment => {
    const schema = {
        text: Joi.string()
            .min(1)
            .max(255)
            .required()
    };

    return JoiValidate(comment, schema);
};

exports.Comment = Comment;
exports.validateComment = validateComment;
