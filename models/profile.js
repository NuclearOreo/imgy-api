const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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
    state: String,
    zip: Number
});

const Profile = mongoose.model('Profile', profileSchema);

function profileValidation(profile) {
    const schema = {
        userId: Joi.objectId().required(),
        username: Joi.string().required(),
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.number()
    };
    return Joi.validate(profile, schema);
}

module.exports.Profile = Profile;
module.exports.profileValidation = profileValidation;