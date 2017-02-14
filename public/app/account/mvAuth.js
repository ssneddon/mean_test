angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;

                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        addUserPersona: function(newPersonaData) {
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            clone.personaCollection.push(newPersonaData);
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
      // delete persona from collection
      deleteUserPersona: function(deletedPersonaData, personaId) {
        var dfd = $q.defer();

        var clone = angular.copy(mvIdentity.currentUser);
        angular.forEach(clone.personaCollection, function(persona) {
          if(persona._id === personaId) {
            clone.personaCollection.splice(clone.personaCollection.indexOf(persona), 1);
            console.log(clone);
          }
        })
        clone.$update().then(function() {
          mvIdentity.currentUser = clone;

          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      // delete persona from collection

      // update persona from collection
      updateUserPersona: function(updatedPersonaData) {
        var dfd = $q.defer();

        var clone = angular.copy(mvIdentity.currentUser);
        angular.forEach(clone.personaCollection, function(persona) {
          if(persona._id === updatedPersonaData._id) {
            clone.personaCollection.splice(clone.personaCollection.indexOf(persona), 1, updatedPersonaData);
            console.log(clone);
          }
        })
        clone.$update().then(function() {
          mvIdentity.currentUser = clone;

          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      // update persona from collection

        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }

        },
        authorizeAuthenticatedUserForRoute: function() {
            if(mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});
