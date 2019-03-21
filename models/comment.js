const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

function commentValidation(comment) {
    const schema = {
        username: Joi.string().min(3).required(),
        comment: Joi.string().min(1).required(),
        postId: Joi.objectid().required()
    };
    return Joi.validate(comment, schema);
};

module.exports.Comment = Comment;
module.exports.commentValidation = commentValidation;