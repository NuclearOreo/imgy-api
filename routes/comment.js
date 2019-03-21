const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Comment, commentValidation} = require('../models/comment');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

router.get('/', async (req,res) => {
    try {
        const comments =  await Comment.find();
        res.send(comments);
    } catch(ex) {
        res.status(500).send(ex);
    } 
});

router.get('/:id', async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectid() });
    if (error) return res.status(400).send(error.details[0].message);
 
    try {
        const comment =  await Comment.findOne({ _id: req.params.id });
        res.send(comment);
    } catch(ex) {
        res.status(500).send(ex);
    } 
});

router.get('/username/:username', async (req,res) => {
    const {error} = Joi.validate(req.params, { username: Joi.string().min(3) });
    if (error) return res.status(400).send(error.details[0].message);
 
    try {
        const comments =  await Comment.find({ username: req.params.username });
        res.send(comments);
    } catch(ex) {
        res.status(500).send(ex);
    } 
});

module.exports = router;