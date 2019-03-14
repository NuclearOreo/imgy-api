const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const bcrypt = require('bcrypt');
const {User, userValidation} = require('../models/user');

router.get('/', async (req,res) => {
    let users;
    if (req.body.email) {
        users = await User.find({ email: req.body.email });
    } else {
        users = await User.find();
    }
    const result = _.map(users, _.partialRight(_.pick, ['_id', 'email']));
    res.send(result);
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

//Need to be Authorized to delete account.
router.delete('/', async (req, res) => {
    if (!req.body.email) return res.status(400).send('Email Required'); 
    const user = await User.deleteOne({ email: req.body.email });
    res.send(user);
});

module.exports = router;