const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {Profile, profileValidation} = require('../models/profile');

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

module.exports = router;