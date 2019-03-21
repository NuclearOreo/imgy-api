const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Comment, commentValidation} = require('../models/comment');
const {Post} =require('../models/post');
const auth =  require('../middleware/auth');
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

router.post('/:postId', auth, async (req, res) => {
    req.body.postId = req.params.postId;
    const body = _.pick(req.body, ['username', 'postId', 'comment']);

    const {error} = commentValidation(body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const post = await Post.findOne({ _id: body.postId });
        if (!post) return res.status(400).send('No post with that id');

        const comment = new Comment(body);
        post.comments.push(comment._id);
        await Post.findOneAndUpdate({ _id: body.postId }, _.pick(post, ['comments']));
        await comment.save();
        res.send(comment);
    } catch(ex) {
        res.status(500).send(ex);
    }
});


module.exports = router;