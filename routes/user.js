const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, userValidation} = require('../models/user');
const config = require('config');

router.get('/', async (req,res) => {
    let users;
    try {
        if (req.body.email) users = await User.find({ email: req.body.email });
        else users = await User.find(); 
    } catch (ex) {
        return res.status(500).send(ex);
    }

    const result = _.map(users, _.partialRight(_.pick, ['_id', 'username', 'email']));
    res.send(result);
});

router.post('/',  async (req, res) => {
    const {error} = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(409).send('Email already exists');

    user = new User(_.pick(req.body, ['email', 'password', 'username']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
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