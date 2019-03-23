const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Comment, commentValidation} = require('../models/comment');
const {Post} =require('../models/post');
const auth =  require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

router.get('/', asyncMiddleware(async (req,res) => {
    const comments =  await Comment.find();
    res.send(comments);
}));

router.get('/:id', asyncMiddleware(async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectid() });
    if (error) return res.status(400).send(error.details[0].message);

    const comment =  await Comment.findOne({ _id: req.params.id });
    res.send(comment);
}));

router.get('/username/:username', asyncMiddleware(async (req,res) => {
    const {error} = Joi.validate(req.params, { username: Joi.string().min(3) });
    if (error) return res.status(400).send(error.details[0].message);
 
    const comments =  await Comment.find({ username: req.params.username });
    res.send(comments);
}));

router.post('/:postId', auth, asyncMiddleware(async (req, res) => {
    req.body.postId = req.params.postId;
    const body = _.pick(req.body, ['username', 'postId', 'comment']);

    const {error} = commentValidation(body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findOne({ _id: body.postId });
    if (!post) return res.status(400).send('No post with that id');

    const comment = new Comment(body);
    post.comments.push(comment._id);
    await Post.findOneAndUpdate({ _id: body.postId }, _.pick(post, ['comments']));
    await comment.save();
    res.send(comment);
}));

router.delete('/:id', auth, asyncMiddleware(async (req,res) => {
    const {error} = Joi.validate(req.params, { id: Joi.objectid() });
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await Comment.findOne({ _id: req.params.id });
    const post = await Post.findOne({ _id: comment.postId });
    
    let postCommnents = post.comments;
    _.remove(postCommnents, (n) => {
        return n.toString() === req.params.id;
    });

    await Post.findOneAndUpdate({ _id: comment.postId }, { comments: postCommnents });
    const result = await Comment.deleteOne({ _id: req.params.id });

    res.send(result);
}));

module.exports = router;