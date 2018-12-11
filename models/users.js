const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const JoiValidate = require('../validation/joi-validate');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 255
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 5,
            maxlength: 30
        },
        avatar: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        website: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        favorites: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    },
    { timestamps: true }
);

// --- Plugins
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

// --- Methods
UserSchema.methods.setPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    console.log('compare', result);
    return result;
};

UserSchema.methods.generateJWT = function() {
    const token = jwt.sign(
        {
            id: this._id,
            name: this.name,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
            bio: this.bio,
            website: this.website,
            location: this.location
        },
        config.get('jwtPrivateKey'),
        { expiresIn: 604800 } // one week
    );
    return `Bearer ${token}`;
};

UserSchema.methods.toAuthJSON = function() {
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar,
        bio: this.bio,
        website: this.website,
        location: this.location
    };
};

UserSchema.methods.toProfileJSON = function(user) {
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        avatar: this.avatar,
        bio: this.bio,
        website: this.website,
        location: this.location,
        following: this.following,
        followers: this.followers,
        favorites: this.favorites,
        followingUser: this.isFollower(user._id)
    };
};

UserSchema.methods.toUpdatedUserJSON = function() {
    return {
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar,
        bio: this.bio,
        website: this.website,
        location: this.location
    };
};

UserSchema.methods.isFollowing = function(id) {
    return this.following.some(follow => {
        return follow.toString() === id.toString();
    });
};

UserSchema.methods.isFollower = function(id) {
    return this.followers.some(follower => {
        if (follower._id) return follower._id.toString() === id.toString();

        return follower.toString() === id.toString();
    });
};

UserSchema.methods.isFavorite = function(id) {
    return this.favorites.some(
        favoriteId => favoriteId.toString() === id.toString()
    );
};

// --- Create Model
const User = mongoose.model('User', UserSchema);

// --- Validations
const validateUserLogin = user => {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email({ minDomainAtoms: 2 }),
        password: Joi.string()
            .min(8)
            .max(255)
            .required()
    };

    return JoiValidate(user, schema);
};

const validateUserCreate = user => {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .label('Name'),
        username: Joi.string()
            .min(5)
            .max(30)
            .required()
            .alphanum()
            .label('Username'),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email({ minDomainAtoms: 2 })
            .label('E-mail'),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
            .label('Password'),
        password2: Joi.string()
            .equal(Joi.ref('password'))
            .error(() => 'do not match with Password')
            .required()
    };

    return JoiValidate(user, schema);
};

const validateUserUpdate = user => {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .label('Name'),
        username: Joi.string()
            .min(5)
            .max(30)
            .required()
            .alphanum()
            .label('Username'),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email({ minDomainAtoms: 2 })
            .label('E-mail'),
        avatar: Joi.string()
            .uri()
            .allow(''),
        bio: Joi.string()
            .min(5)
            .max(255)
            .allow(''),
        website: Joi.string()
            .uri()
            .allow(''),
        location: Joi.string()
            .min(5)
            .max(255)
            .allow('')
    };

    return JoiValidate(user, schema);
};

exports.User = User;
exports.validateUserLogin = validateUserLogin;
exports.validateUserCreate = validateUserCreate;
exports.validateUserUpdate = validateUserUpdate;
