const passport = require('passport');
const Fawn = require('fawn');
const router = require('express').Router();
const { User } = require('../../models/users');

// --- Preload user on routes with ':username'
router.param('username', async (req, res, next, username) => {
    const user = await User.findOne({ username });

    if (!user)
        return res.status(404).json({
            errors: { _error: 'No user with the given username was found' }
        });

    req.profile = user;
    next();
});

// @route   GET /api/profiles/:username
// @desc    Get user with the given username
// @access  Public
router.get(
    '/:username',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const profile = await User.findById(req.profile._id)
            .populate({
                path: 'following',
                populate: { path: 'users' },
                select: 'username name avatar'
            })
            .populate({
                path: 'followers',
                populate: { path: 'users' },
                select: 'username name avatar'
            })
            .populate({
                path: 'favorites',
                populate: { path: 'posts' }
            })
            .exec();
        return res.json({
            profile: profile.toProfileJSON(req.user)
        });
    }
);

// @route   POST /api/profiles/:username/follow
// @desc    Add user with given username to following of authenticated user
//          && Add authenticated user to followers of user with given username
// @access  Private
router.post(
    '/:username/follow',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        const { user, profile: userToFollow } = req;

        if (user.isFollowing(userToFollow._id))
            return res
                .status(422)
                .json({ errors: { _error: 'Already following user' } });

        new Fawn.Task()
            .update(
                'users',
                { _id: user._id },
                {
                    $set: {
                        following: [...user.following, userToFollow._id]
                    }
                }
            )
            .update(
                'users',
                { _id: userToFollow._id },
                {
                    $set: {
                        followers: [...userToFollow.followers, user._id]
                    }
                }
            )
            .run()
            .then(results => {
                return res.send({ success: 'User followed' });
            })
            .catch(err => next(err));

        // return res.send({ user, userToFollow, result });
    }
);

// @route   DELETE /api/profiles/:username/follow
// @desc    Remove user with given username from following of authenticated user
//          && Remove authenticated user from followers of user with given username
// @access  Private
router.delete(
    '/:username/follow',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        const { user, profile: userToFollow } = req;

        if (!user.isFollowing(userToFollow._id))
            return res
                .status(422)
                .json({ errors: { _error: 'Not yet following user' } });

        new Fawn.Task()
            .update(
                'users',
                { _id: user._id },
                {
                    $set: {
                        following: user.following.filter(
                            userId =>
                                userId.toString() !==
                                userToFollow._id.toString()
                        )
                    }
                }
            )
            .update(
                'users',
                { _id: userToFollow._id },
                {
                    $set: {
                        followers: userToFollow.followers.filter(
                            userId => userId.toString() !== user._id.toString()
                        )
                    }
                }
            )
            .run()
            .then(results => {
                return res.send({ success: 'User unfollowed' });
            })
            .catch(err => next(err));
    }
);

module.exports = router;
