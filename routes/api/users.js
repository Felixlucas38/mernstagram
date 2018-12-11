const passport = require('passport');
const router = require('express').Router();
const {
    User,
    validateUserLogin,
    validateUserCreate,
    validateUserUpdate
} = require('../../models/users');

// @route   POST /api/users/login
// @desc    Login user - Generate JWT
// @access  Public
router.post('/login', async (req, res) => {
    // --- Validate
    const errors = validateUserLogin(req.body);
    if (errors) return res.status(400).json({ errors });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(400)
            .json({ errors: { _error: 'Invalid E-mail or Password' } });

    if (!(await user.validatePassword(req.body.password)))
        return res
            .status(400)
            .json({ errors: { _error: 'Invalid E-mail or Password' } });

    return res.json({ token: user.generateJWT() });
});

// @route   POST /api/users
// @desc    Create new user
// @access  Public
router.post('/', async (req, res) => {
    // --- Validate client data
    const errors = validateUserCreate(req.body);
    if (errors) return res.status(400).json({ errors });

    // --- Create new user
    user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    await user.setPassword(req.body.password);
    await user.save();

    return res.json({ token: user.generateJWT() });
});

// @route   PUT /api/users
// @desc    Update authenticated user
// @access  Private
router.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // --- Check if user was found
        if (!req.user) return res.status(404).json({ user: 'was not found' });

        // --- Validate
        const errors = validateUserUpdate(req.body);
        if (errors) return res.status(400).json({ errors });

        // --- Prepare fields to update
        let userFields = {};
        // Required fields
        userFields.name = req.body.name;
        userFields.username = req.body.username;
        userFields.email = req.body.email;

        // Optional fields
        userFields.bio = req.body.bio || '';
        userFields.avatar = req.body.avatar || '';
        userFields.website = req.body.website || '';
        userFields.location = req.body.location || '';

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: userFields
            },
            { new: true }
        );
        return res.json({
            user: user.toUpdatedUserJSON(),
            token: user.generateJWT()
        });
    }
);

// TO DO: Delete Route
// @route   DELETE /api/users
// @desc    Delete authenticated user
// @access  Private
// router.delete(
//     '/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {}
// );

module.exports = router;
