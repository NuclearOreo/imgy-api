const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {Profile, profileValidation} = require('../models/profile');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    let profiles;
    
    try {
        if (req.body.email) profiles = await Profile.find({ 
            _id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname
        });
        else profiles= await Profile.find(); 
    } catch (ex) {
        return res.status(500).send(ex);
    }

    res.send(profiles);
});

router.post('/', auth, async (req, res) => {
    const {error} = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

module.exports = router;