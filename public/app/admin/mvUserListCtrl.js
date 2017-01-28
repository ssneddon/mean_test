angular.module('app').controller('mvUserListCtrl', function($scope, $q, mvUser) {
  var deferredObject = $q.defer();
  mvUser
    .query()
    .$promise
    .then(function(result) {
    $scope.users = result;
  }), function (errorMsg) {
    deferredObject.reject(errorMsg);
  };

  return deferredObject.promise
});
