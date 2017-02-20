angular.module('app').controller('pcUserListCtrl', function($scope, $q, pcUser) {
  var deferredObject = $q.defer();
  pcUser
    .query()
    .$promise
    .then(function(result) {
    $scope.users = result;
  }), function (errorMsg) {
    deferredObject.reject(errorMsg);
  };

  return deferredObject.promise
});
