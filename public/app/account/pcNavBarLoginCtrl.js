angular.module('app').controller('pcNavBarLoginCtrl', function($scope, $http, $location, pcIdentity, pcNotifier, pcAuth){
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
        pcAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            $location.path('/');
            pcNotifier.notify('You have successfully signed out');

        });
    }
});
