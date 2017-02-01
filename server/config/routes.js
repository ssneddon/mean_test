var auth = require('./auth'),
    users = require('../controllers/users')
   , mongoose = require('mongoose')
  , User = mongoose.model('User');
module.exports = function (app) {
  app.get('/api/users', auth.requiresRole ('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);
  // the app.get partials tells angular where to get the partial view
  app.get('/partials/*', function (req, res) {
    // use the req.params to get url parameters
    res.render('../../public/app/' + req.params[0]);
  });
  app.post('/login', auth.authenticate)
  app.post('/logout', function (req, res) {
      req.logout();
      res.end();
    })
    // this tells the server to send all request to the index page. make sure to use a leading / when setting up your client side routes
  app.get('*', function (req, res) {
    res.render('index', {
      //bootstrapping - sending another piece of data along with the server response. In this case, we are sending the user
      bootstrappedUser: req.user
    });
  });
}
