const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const userAuth = require('./routes/userAuth');
const userCrud = require('./routes/userCrud');
const posts = require('./routes/posts');
const follow = require('./routes/follow');
const feed = require('./routes/feed')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DataBase Connected");
});

app.get('/', (req, res) => {
    res.send("Hi")
})
app.use('/v1/api/users/auth', userAuth);
app.use('/v1/api/users/', userCrud);
app.use('/v1/api/posts/', posts);
app.use('/v1/api/follow/', follow);
app.use('/v1/api/feed', feed);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})