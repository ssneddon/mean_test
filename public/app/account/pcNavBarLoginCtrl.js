angular.module('app').controller('pcNavBarLoginCtrl', function($scope, $http, $routeParams, $location, pcIdentity, pcNotifier, pcAuth){
    $scope.identity = pcIdentity;
    $scope.signin = function(username, password){
        pcAuth.authenticateUser(username, password).then(function(success){
            if(success){
                pcNotifier.notify('You have successfully signed in');
                $location.path('/main');
            }
            else {
                pcNotifier.notify('Username/Password combination incorrect');
            }
        });

    }
    $scope.signout = function() {
      var updatedPersonaData = {
        personaDetails: $scope.personaLayout,
        _id: $routeParams.personaId
      };

        pcAuth.logoutUser(updatedPersonaData).then(function() {
            $scope.username = "";
            $scope.password = "";
            $location.path('/');
            pcNotifier.notify('You have successfully signed out');

        });
    }
});
