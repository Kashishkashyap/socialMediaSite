const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../model/posts');
const Follow = require('../model/follow');

const router = express.Router();

// @route   GET /v1/api/feed
// @desc    Get posts from users that the authenticated user follows
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const follows = await Follow.find({ follower: req.user.id }).select('following');
        const followingIds = follows.map(follow => follow.following);

        const posts = await Post.find({ user: { $in: followingIds } }).sort({ timestamp: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
