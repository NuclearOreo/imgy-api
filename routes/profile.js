const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {Profile, profileValidation} = require('../models/profile');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find();
        res.send(profiles);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

router.get('/:userid', async (req,res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.userid });
        res.send(profile);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

router.post('/', auth, async (req, res) => {
    const {error} = profileValidation(_.pick(req.body, ['userId', 'firstname', 'lastname', 'street', 'city', 'zip']));
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const profile = await Profile.findOne({ userId: req.body.userId });
        if (profile) return res.status(409).send('Profile exists');
        newprofile = new Profile(_.pick(req.body, ['userId', 'firstname', 'lastname', 'street', 'city', 'zip']));
        await newprofile.save();
        res.send(newprofile);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

router.put('/', auth, async (req, res) => {
    try {
        const result = await Profile.findOneAndUpdate({ userId: req.body.userId }, _.pick(req.body,[
            'firstname', 'lastname', 'street', 'city', 'zip'
        ]));
        res.send(result);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        const result = await Profile.findOneAndDelete(req.body.userId);
        res.send(result);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

module.exports = router;