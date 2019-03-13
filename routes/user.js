const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const bcrypt = require('bcrypt');
const {User, userValidation} = require('../models/user');

router.get('/', (req,res) => {
    res.send('working');
});

router.post('/',  async (req, res) => {
    const isValid = userValidation(req.body);
    if (isValid.error) return res.status(400).send(isValid.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Email already exists');

    user = new User(_.pick(req.body, ['email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(user.genToken());
});

module.exports = router;