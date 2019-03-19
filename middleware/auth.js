const jwt = require('jsonwebtoken');
const config = require('config');
const {User} = require('../models/user');

module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send('No token');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await User.findOne({ _id: decoded.id });
        if (!user) return res.status(500).send('User does not exist');
        next(); 
    } catch (ex) {
        res.status(400).send(ex);
    }
};