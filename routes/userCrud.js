const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/auth');
const User = require('../model/user');

const router = express.Router();



// @route   GET /v1/api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT /v1/api/users/:id
// @desc    Update user profile by ID
// @access  Private
router.put('/:id', fetchUser, [
    body('bio', 'Please enter a valid bio').optional().isString(),
    body('profilePicture', 'Please enter a valid profile picture URL').optional().isURL()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { bio, profilePicture } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.id !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        user.bio = bio || '';
        user.profilePicture = profilePicture || '';

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /v1/api/users/:id
// @desc    Delete user profile by ID
// @access  Private
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.id !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
