require('express-async-errors');
const express = require('express');
const user = require('../routes/user');
const profile = require('../routes/profile');
const post = require('../routes/post');
const comment = require('../routes/comment');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth/login', auth)
    app.use('/api/users', user);
    app.use('/api/profiles', profile);
    app.use('/api/posts', post);
    app.use('/api/comments', comment);
    app.use(error);
}