//all the configuration code is handled in this file

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
// you can set your production env in command line with NODE_ENV=environemntName - either development or production
module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
       db: 'mongodb://PCOAdev:PCOApass@ds145128.mlab.com:45128/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
