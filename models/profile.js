const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firstname : {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    street: String,
    city: String,
    State: String,
    zip: Number,
    posts: [String],
    comments: [String] 
});

const Profile = mongoose.model('Profile', profileSchema);

function profileValidation(profile) {
    const schema = {
        userId: Joi.objectId().required(),
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        street: Joi.string(),
        city: Joi.string(),
        zip: Joi.number(),
        posts: Joi.array().items(Joi.objectId()),
        comments: Joi.array().items(Joi.objectId())
    };
    return Joi.validate(profile, schema);
}

module.exports.Profile = Profile;
module.exports.profileValidation = profileValidation;