var User = require('mongoose').model('User');

exports.getPersona = function(req, res) {
  console.log(req.user);
};
