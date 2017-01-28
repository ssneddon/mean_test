angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
      var currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
      //the isauthenticated function of the mvIdentity servcice is used to ask if there is a logged in user
        isAuthenticated: function() {
            return !!this.currentUser;
        }

    }
})
