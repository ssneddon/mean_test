var mongoose = require('mongoose'),
    userModel = require('../models/User');
//this is the connection to mongo using mongoose
module.exports = function(config) {
  // here we are setting the connection to the mongodb with the db member of the config file.
 mongoose.connect(config.db);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection   error...'));
 db.once('open', function callback() {
  console.log('multivision db opened');
 });

  userModel.createDefaultUsers;

};


