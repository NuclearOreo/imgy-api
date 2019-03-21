const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, userValidation} = require('../models/user');
const config = require('config');

router.get('/', async (req,res) => {
    try {
       let users = await User.find();
       users = _.map(users, _.partialRight(_.pick, ['_id', 'username', 'email']));
       res.send(users);
    } catch (ex) {
        return res.status(500).send(ex);
    }
});

router.get('/:username', async (req,res) => {
    try {
       let user = await User.findOne({ username: req.params.username });
       user = _.pick(user, ['_id', 'username', 'email'])
       res.send(user);
    } catch (ex) {
        return res.status(500).send(ex);
    }
});

router.get('/id/:id', async (req,res) => {
    try {
       let user = await User.findOne({ _id: req.params.id });
       user = _.pick(user, ['_id', 'username', 'email'])
       res.send(user);
    } catch (ex) {
        return res.status(500).send(ex);
    }
});

router.post('/',  async (req, res) => {
    const {error} = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        req.body.email = req.body.email.toLowerCase();
        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(409).send('Email already exists');

        user = await User.findOne({username: req.body.username});
        if (user) return res.status(409).send('Username already exists');
    
        user = new User(_.pick(req.body, ['email', 'password', 'username']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save();
        res.send(user.genToken());
    } catch (ex) {
        return res.status(500).send(ex);
    }
});

router.delete('/', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send('No auth token');

    const decoded = jwt.decode(token, config.get('jwtPrivateKey'));
    if (!decoded) return res.status(400).send('Bad token'); 

    try {
        const result = await User.deleteOne({ _id: decoded.id });
        res.send(result);
    } catch (ex) {
        return res.status(500).send(ex); 
    }
});

module.exports = router;