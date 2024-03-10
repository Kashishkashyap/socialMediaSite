const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/auth');
const Post = require('../model/posts');

const router = express.Router();

// @route   POST /v1/api/posts/
// @desc    Create a new post
// @access  Private
router.post('/', fetchUser, [
    body('title', 'title is required').notEmpty(),
    body('description', 'description is required').notEmpty(),
    body('image', 'Please enter a valid picture URL').optional().isURL()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, image } = req.body;

        try {
            const post = new Post({
                user: req.user.id,
                title,
                description,
                image
            });

            await post.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route   GET /v1/api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /v1/api/posts/:id
// @desc    Update post by ID
// @access  Private
router.put('/:id', fetchUser, [
    body('title', 'title is required').notEmpty(),
    body('description', 'description is required').notEmpty(),
    body('image', 'Please enter a valid picture URL').optional().isURL()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, image } = req.body;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        post.title = title;
        post.description = description;
        post.image = image || '';

        await post.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /v1/api/posts/:id
// @desc    Delete post by ID
// @access  Private
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await post.deleteOne();

        res.json({ message: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
