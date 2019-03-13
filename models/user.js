const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.genToken = function () {
    const token = jwt.sign({id: this._id, email: this.email}, 'secret');
    return token;
}

const User = mongoose.model('User', userSchema);

function userValidation(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.userValidation = userValidation;