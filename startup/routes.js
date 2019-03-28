require('express-async-errors');
const express = require('express');
const user = require('../routes/user');
const profile = require('../routes/profile');
const post = require('../routes/post');
const comment = require('../routes/comment');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        next();
    });
    app.use(express.json());
    app.use('/api/auth/login', auth)
    app.use('/api/users', user);
    app.use('/api/profiles', profile);
    app.use('/api/posts', post);
    app.use('/api/comments', comment);
    app.use(error);
}