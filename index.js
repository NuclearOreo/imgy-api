const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const profile = require('./routes/profile');
const post = require('./routes/post');
const comment = require('./routes/comment');
const auth = require('./routes/auth');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
    console.log('Set Enviroment Key');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/imgy')
.then(console.log('Conneted to mongodb....'))
.catch(err => console.error('Connection to mongodb failed....'));

app.use(express.json());
app.use('/api/auth/login', auth)
app.use('/api/users', user);
app.use('/api/profiles', profile);
app.use('/api/posts', post);
app.use('/api/comments', comment);

app.get('/', (req, res) => {
    res.send('Connection is Working');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));