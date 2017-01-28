var express = require('express'),
    // stylus is used to server css files
    stylus = require('stylus'),
    //
    logger = require('morgan'),
    //
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
// here we are setting a module.exports for use in the server.js file. we are passing the function an app paramtere and a config parameter. The app parameter is passed to this function when it is 'required' in the server.js file. The app parameter is the instance of express that is defined as the var app in the  server.js file.
// the config paramter is also define in the server.js file and passed to this function when it is required in the server.js file
module.exports = function(app, config){
    // setting up the stylus middleware compile function that is used by middleware
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
  // this is for parsing url encoded
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
  // this is for parsing json
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns', resave:false, saveUninitialized:false}))
    app.use(passport.initialize());
    app.use(passport.session());
  // setting up stylus middleware
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

  // this is express' static middleware. this tells express that if any request come in for any file that lives in the public directory to serve that file. This is how you set up express static page serving.
    app.use(express.static(config.rootPath + '/public'));

}
