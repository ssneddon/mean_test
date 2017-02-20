angular.module('app').controller('pcMainCtrl', function($scope, pcIdentity) {
  $scope.identity = pcIdentity;
  $scope.personas = pcIdentity.currentUser.personaCollection

});
