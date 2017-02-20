angular.module('app').controller('pcSignupCtrl', function($scope, pcUser, pcNotifier, $location, pcAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        pcAuth.createUser(newUserData).then(function() {
            pcNotifier.notify('User account created!');
            $location.path('/main');
        }, function(reason) {
            pcNotifier.error(reason);
        })
    }
})
