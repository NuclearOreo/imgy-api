const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Post, postValidation} = require('../models/post');
const auth = require('../middleware/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

router.get('/:username', async (req,res) => {
    try {
        const posts = await Post.find({ username: req.params.username });
        res.send(posts);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

router.get('/id/:id', async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectId() });
    if (error) return res.status(400).send('Invalid ID');

    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

router.post('/:username', auth, async (req,res) => {
    if (req.params.username !== req.body.username) return res.status(400).send('Not Authorized');

    const newpost = _.pick(req.body, ['imageUrl', 'username']);
    const {error} = postValidation(newpost);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const post = new Post(newpost);
        await post.save();
        res.send(post);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

router.delete('/:id', auth, async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectId() });
    if (error) return res.status(400).send(error.details[0].message);
    
    try {

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).send('Post does not exist');

        if (post.username !== req.body.username) return res.status(400).send('Not authorized to delete');

        const result = await Post.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (ex) {
        res.status(500).send(ex);
    }
});

module.exports = router;