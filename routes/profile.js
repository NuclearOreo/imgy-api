const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {Profile, profileValidation} = require('../models/profile');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    const profiles = await Profile.find();
    res.send(profiles);
});

router.get('/:username', async (req,res) => {
    const profile = await Profile.findOne({ username: req.params.username });
    res.send(profile);
});

router.post('/', auth, async (req, res) => {
    const {error} = profileValidation(_.pick(req.body, ['userId', 'username', 'firstname', 'lastname', 'street', 'city', 'state', 'zip']));
    if (error) return res.status(400).send(error.details[0].message);

    const profile = await Profile.findOne({ username: req.body.username });
    if (profile) return res.status(409).send('Profile exists');
    newprofile = new Profile(_.pick(req.body, ['userId', 'username', 'firstname', 'lastname', 'street', 'city', 'state', 'zip']));
    await newprofile.save();
    res.send(newprofile);
});

router.put('/', auth, async (req, res) => {
    const result = await Profile.findOneAndUpdate({ userId: req.body.userId }, _.pick(req.body,[
        'firstname', 'lastname', 'street', 'city', 'zip'
    ]));
    res.send(result);
});

router.delete('/', auth, async (req, res) => {
    const result = await Profile.deleteOne({ userId: req.body.userId });
    res.send(result);
});

module.exports = router;