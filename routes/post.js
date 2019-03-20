const _ = require('lodash');
const app = require('express');
const router = app.Router();
const {Post, postValidate} = require('../models/post');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

module.exports = router;