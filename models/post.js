const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    comments: [mongoose.Schema.Types.ObjectId,]
});

const Post = mongoose.model('Post', postSchema);

function postValidation(post) {
    const schema = {
        username: Joi.string().min(3).required(),
        imageUrl: Joi.string().uri().required(),
        comments: Joi.array().items(Joi.objectId())
    }
    return Joi.validate(post, schema);
}

module.exports.Post = Post;
module.exports.postValidation = postValidation;