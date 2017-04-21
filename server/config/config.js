var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://PCOAuser:sudden@ds027628.mlab.com:27628/pcoa_user',
        port: process.env.PORT || 80
    }
}
