const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Post, postValidation} = require('../models/post');
const auth = require('../middleware/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/', async (req,res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.get('/:username', async (req,res) => {
    const posts = await Post.find({ username: req.params.username });
    res.send(posts);
});

router.get('/id/:id', async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectId() });
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findOne({ _id: req.params.id });
    const filtered = _.pick(post, ['comments', '_id', 'imageUrl', 'username']);
    res.send(filtered);
});

router.post('/:username', auth, async (req,res) => {
    if (req.params.username !== req.body.username) return res.status(400).send('Not Authorized');

    const newpost = _.pick(req.body, ['imageUrl', 'username']);
    const {error} = postValidation(newpost);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post(newpost);
    await post.save();
    res.send(post);
});

router.delete('/:id', auth, async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectId() });
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('Post does not exist');

    if (post.username !== req.body.username) return res.status(400).send('Not authorized to delete');

    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(result);
});

module.exports = router;