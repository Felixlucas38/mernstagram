const mongoose = require('mongoose');
const passport = require('passport');
const Fawn = require('fawn');
const router = require('express').Router();
const { Post, validatePost } = require('../../models/posts');
const { Comment, validateComment } = require('../../models/comments');
const { User } = require('../../models/users');

// --- Preload post on routes with ':post'
router.param('post', async (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ errors: { _error: 'Invalid Post ID' } });

    const post = await Post.findById(id);

    if (!post)
        return res.status(404).json({
            errors: { _error: 'No post with the given ID was found' }
        });

    req.post = post;

    next();
});

// --- Preload comment on routes with ':comment'
router.param('comment', async (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return res
            .status(400)
            .json({ errors: { _error: 'Invalid Comment ID' } });

    const comment = await Comment.findById(id);

    if (!comment)
        return res.status(404).json({
            errors: { _error: 'No comment with the given ID was found' }
        });

    req.comment = comment;

    next();
});

// @route   GET /api/posts
// @desc    Get posts
// @access  Public
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const query = { author: { $nin: [req.user._id] } };
        let limit = 15;
        let offset = 0;

        if (typeof req.query.limit !== 'undefined') limit = req.query.limit;

        if (typeof req.query.offset !== 'undefined') offset = req.query.offset;

        const author = req.query.author
            ? await User.findOne({ username: req.query.author })
            : null;

        if (author) query.author = author._id;

        const posts = await Post.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author', 'name username avatar');

        let comments = posts.reduce(
            (acc, post) => (acc = [...acc, ...post.comments]),
            []
        );
        comments = await Comment.find({ _id: { $in: comments } })
            .populate('author', 'username')
            .sort({ createdAt: 'asc' })
            .exec();

        const postsCount = await Post.count(query).exec();

        return res.json({ posts, postsCount, comments });
    }
);

// @route   GET /api/posts/feed
// @desc    Get post of all users that the authenticated user follows
// @access  Private
router.get(
    '/feed',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user } = req;
        const query = {};
        let limit = 15;
        let offset = 0;

        if (typeof req.query.limit !== 'undefined') limit = req.query.limit;

        if (typeof req.query.offset !== 'undefined') offset = req.query.offset;

        const posts = await Post.find({
            author: { $in: user.following },
            ...query
        })
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author', 'name username avatar');

        let comments = posts.reduce(
            (acc, post) => (acc = [...acc, ...post.comments]),
            []
        );
        comments = await Comment.find({ _id: { $in: comments } })
            .populate('author', 'username')
            .sort({ createdAt: 'asc' })
            .exec();

        const postsCount = await Post.count({
            author: { $in: user.following },
            ...query
        }).exec();

        return res.json({
            posts,
            postsCount,
            comments: comments
        });
    }
);

// @route   GET /api/posts/:post
// @desc    Get post by ID
// @access  Public
router.get('/:post', async (req, res) => {
    const post = await Post.findById(req.post._id)
        .populate('author', '_id username name avatar')
        .exec();

    let comments = await Comment.find({ _id: { $in: post.comments } })
        .populate('author', 'username')
        .sort({ createdAt: 'asc' })
        .exec();

    return res.json({ post, comments });
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user } = req;

        // --- Check user
        if (!user)
            return res.status(404).json({
                errors: { _error: 'No user with the given username was found' }
            });

        // --- Validate data
        const errors = validatePost(req.body);
        if (errors) return res.status(400).json({ errors });

        const post = new Post();
        post.author = user._id;
        post.imageURL = req.body.imageURL;
        post.description = req.body.description;
        await post.save();

        return res.json({ post: post.toPostJSON() });
    }
);

// @route   PUT /api/posts/:post
// @desc    Update post with the given ID
// @access  Private
router.put(
    '/:post',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // --- Validate data
        const errors = validatePost(req.body);
        if (errors) return res.status(400).json({ errors });

        const post = await Post.findByIdAndUpdate(
            req.post._id,
            {
                $set: {
                    imageURL: req.body.imageURL,
                    description: req.body.description
                }
            },
            { new: true }
        );

        return res.json({ post: post.toPostJSON() });
    }
);

// @route   DELETE /api/posts/:post
// @desc    Delete post with the given ID
// @access  Private
router.delete(
    '/:post',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // TO DO: Make it a transaction

        req.post.comments.forEach(
            async c => await Comment.findByIdAndRemove(c)
        );
        const post = await Post.findByIdAndRemove(req.post._id);

        return res.json({ post });
    }
);

// @route   POST /api/posts/:post/favorite
// @desc    Add post with the given ID to the authenticated user favorites
// @access  Private
router.post(
    '/:post/favorite',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post } = req;

        if (user.isFavorite(post._id))
            return res
                .status(422)
                .json({ errors: { _error: 'Post already in favorites' } });

        const result = await User.findByIdAndUpdate(
            user._id,
            {
                $set: { favorites: [...user.favorites, post._id] }
            },
            { new: true }
        );
        return res.json({ user: result });
    }
);

// @route   DELETE /api/posts/:post/favorite
// @desc    Remove post with the given ID from the authenticated user favorites
// @access  Private
router.delete(
    '/:post/favorite',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post } = req;

        if (!user.isFavorite(post._id))
            return res
                .status(422)
                .json({ errors: { _error: 'Post not yet in favorites' } });

        const result = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    favorites: user.favorites.filter(
                        f => f.toString() !== post._id.toString()
                    )
                }
            },
            { new: true }
        );
        return res.json({ user: result });
    }
);

// @route   POST /api/posts/:post/like
// @desc    Add authenticated user to likes of post with the given ID
// @access  Private
router.post(
    '/:post/like',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post } = req;

        if (post.isAlreadyLiked(user._id))
            return res
                .status(422)
                .json({ errors: { _error: 'User already likes this post' } });

        const result = await Post.findByIdAndUpdate(
            post._id,
            {
                $set: { likes: [...post.likes, user._id] }
            },
            { new: true }
        );
        return res.json({ userId: user._id, postId: post._id });
    }
);

// @route   DELETE /api/posts/:post/like
// @desc    Remove authenticated user from likes of post with the given ID
// @access  Private
router.delete(
    '/:post/like',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post } = req;

        if (!post.isAlreadyLiked(user._id))
            return res
                .status(422)
                .json({ errors: { _error: 'User not yet likes this post' } });

        const result = await Post.findByIdAndUpdate(
            post._id,
            {
                $set: {
                    likes: post.likes.filter(
                        like => like.toString() !== user._id.toString()
                    )
                }
            },
            { new: true }
        );
        return res.json({ userId: user._id, postId: post._id });
    }
);

// @route   POST /api/posts/:post/comments
// @desc    Add new comment to post with the given ID
// @access  Private
router.post(
    '/:post/comments',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post } = req;

        // --- Validate
        const errors = validateComment(req.body);
        if (errors) return res.status(400).json({ errors });

        let comment = new Comment({
            author: user._id,
            post: post._id,
            text: req.body.text
        });

        // TO DO: Make it a transaction
        comment = await comment.save();
        await Post.findByIdAndUpdate(post._id, {
            $set: { comments: [...post.comments, comment._id] }
        });

        // TO DO: Improve implementation
        comment = await Comment.findById(comment._id).populate(
            'author',
            'username'
        );

        return res.json({ comment: comment.toJSON() });
    }
);

// @route   DELETE /api/posts/:post/comments/:comment
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/:post/comments/:comment',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { user, post, comment } = req;

        if (comment.author.toString() !== user._id.toString())
            return res.sendStatus(403);

        if (!post.comments.some(c => c.toString() === comment._id.toString()))
            return res.status(400).json({
                errors: {
                    _error: 'Comment does not belong to specified Post',
                    comment,
                    post
                }
            });

        // TO DO: Make it a transaction
        await Comment.findByIdAndRemove(comment._id);
        await Post.findByIdAndUpdate(post._id, {
            $set: {
                comments: post.comments.filter(
                    c => c.toString() !== comment._id.toString()
                )
            }
        });

        return res.json({ comment: comment.toJSON() });
    }
);

module.exports = router;
