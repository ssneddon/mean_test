var express = require('express');
// this is nodes process.env.NODE_ENV property that contains the development enviroment. Here we have set it to itself OR to the development environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
//pass the env var to the config.js file as a key, this is then evaluated against the two keys in the config.js file 'production' and 'development'
var config = require('./server/config/config')[env];
//pass the app var and config var to the express.js function
require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);


require('./server/config/passport')();


require('./server/config/routes') (app);

app.listen(config.port);

console.log('listening on port' + config.port + '...');
