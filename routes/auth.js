const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

function validate(body) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(body, schema);    
}

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('Invalid email or password');

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(401).send('Invalid email or password');

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, config.get('jwtPrivateKey'));
    res.send(token);
});

module.exports = router;


