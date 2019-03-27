const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('database'), { useNewUrlParser: true, useCreateIndex: true })
    .then(console.log('Conneted to mongodb....'))
    .catch(err => console.error('Connection to mongodb failed....'));
}