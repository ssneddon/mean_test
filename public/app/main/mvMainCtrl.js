angular.module('app').controller('mvMainCtrl', function($scope, mvIdentity) {
  $scope.identity = mvIdentity;
  $scope.personas = mvIdentity.currentUser.personaCollection

});
