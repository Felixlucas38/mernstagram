const mongoose = require('mongoose');
const Joi = require('joi');
const JoiValidate = require('../validation/joi-validate');
const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageURL: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 255,
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    { timestamps: true }
);

// --- Methods
PostSchema.methods.isAlreadyLiked = function(user) {
    return this.likes.some(like => like.toString() === user.toString());
};

PostSchema.methods.toPostJSON = function() {
    return {
        id: this._id,
        author: this.author,
        imageURL: this.imageURL,
        description: this.description,
        likes: this.likes,
        comments: this.comments,
        date: this.date,
        createdAt: this.createdAt
    };
};

// --- Create model
const Post = mongoose.model('Post', PostSchema);

// --- Validations
const validatePost = post => {
    const schema = {
        imageURL: Joi.string()
            .uri()
            .required(),
        description: Joi.string()
            .min(5)
            .max(255)
            .required()
    };

    return JoiValidate(post, schema);
};

exports.Post = Post;
exports.validatePost = validatePost;
