const jwt = require('jsonwebtoken');

const JWT_SECRET = "SecurePassword";

const fetchUser = async (req, res, next) => {

    const token = req.header('token');
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Invalid Token" })
    }
    try {
        // console.log(JWT_SECRET)
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid user" })
    }

}

module.exports = fetchUser;