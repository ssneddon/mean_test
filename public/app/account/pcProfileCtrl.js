angular.module('app').controller('pcProfileCtrl', function($scope, pcAuth, pcIdentity, pcNotifier) {
  $scope.email = pcIdentity.currentUser.userName;
  $scope.fname = pcIdentity.currentUser.firstName;
  $scope.lname = pcIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    pcAuth.updateCurrentUser(newUserData).then(function() {
      pcNotifier.notify('Your user account has been updated');
    }, function(reason) {
      pcNotifier.error(reason);
    })
  }
})
