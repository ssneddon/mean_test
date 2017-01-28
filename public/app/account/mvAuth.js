angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {
        username: username
        , password: password
      }).then(function (response) {
        console.log(response)
        if (response.data.success) {
          var user =  new mvUser();
          angular.extend(user, response.data.user);
          mvIdentity.currentUser = user;
          dfd.resolve(true);
          console.log(user);
        }
        else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }
    , createUser: function (newUserData) {
      var newUser = new mvUser(newUserData);
      var dfd = $q.defer();
      newUser.$save().then(function () {
        mvIdentity.currentUser = newUser;
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
    , logoutUser: function () {
      var dfd = $q.defer();
      $http.post('/logout', {
        logout: true
      }).then(function () {
        mvIdentity.currentUser = undefined;
        dfd.resolve();
      }), function(errorMsg) {
        dfd.reject(errorMsg) ;
      };
      return dfd.promise;
    }
  }
});
