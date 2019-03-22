const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/imgy', { useNewUrlParser: true, useCreateIndex: true })
    .then(console.log('Conneted to mongodb....'))
    .catch(err => console.error('Connection to mongodb failed....'));
}