angular.module('app').factory('pcIdentity', function($window, pcUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new pcUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})
