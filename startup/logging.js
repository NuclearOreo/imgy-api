const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        console.log('Set Enviroment Key');
        process.exit(1);
    }
}