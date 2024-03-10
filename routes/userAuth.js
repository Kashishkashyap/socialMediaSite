const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "SecurePassword";
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());
const tokenExpiration = '1h';

// @route   POST v1/api/users/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
],
    async (req, res) => {
        try {
            let success = false;
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    success,
                    error: "User with provided email address already exists"
                })
            }
            const salt = await bcrypt.genSalt(10);

            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                _id: uuidv4(),
                username: req.body.username,
                password: encryptedPassword,
                email: req.body.email,
                bio: req.body.bio,
                profilePicture: req.body.profilePicture
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const token = jwt.sign(data, JWT_SECRET, { expiresIn: tokenExpiration });
            res.json({ success, token, userId: user.id });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error")
        }

    })

// @route   POST v1/api/users/auth/signin
// @desc    Login user
// @access  Public
router.post('/signin', [
    body('email', 'Please enter a valid username').notEmpty(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: tokenExpiration });
        success = true
        res.json({ success, token, userId: user._id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}
)


module.exports = router;