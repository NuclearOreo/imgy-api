const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Post, postValidation} = require('../models/post');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
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

module.exports = router;