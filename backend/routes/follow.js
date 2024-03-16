const express = require('express');
const fetchUser = require('../middleware/auth');
const Follow = require('../model/follow');

const router = express.Router();

// @route   POST /v1/api/follow/:id
// @desc    Follow a user by ID
// @access  Private
router.post('/:id', fetchUser, async (req, res) => {
    try {
        console.log(req.params.id)
        const follow = new Follow({
            follower: req.user.id,
            followed: req.params.id
        });

        await follow.save();

        res.json({ message: 'User followed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /v1/api/follow/:id
// @desc    Unfollow a user by ID
// @access  Private
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const { id } = req.params;

        await Follow.findOneAndDelete({ follower: req.user.id, followed: id });

        res.json({ message: 'User unfollowed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /v1/api/follow/following
// @desc    Get list of users following the authenticated user
// @access  Private
router.get('/following', fetchUser, async (req, res) => {
    try {
        const follows = await Follow.find({ follower: req.user.id });

        res.json(follows.map(follow => follow.followed));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /v1/api/follow/followers
// @desc    Get list of users the authenticated user is following
// @access  Private
router.get('/followers', fetchUser, async (req, res) => {
    try {
        const follows = await Follow.find({ followed: req.user.id });

        res.json(follows.map(follow => follow.follower));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

