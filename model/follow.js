const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    followed: {
        type: String,
        required: true
    }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
