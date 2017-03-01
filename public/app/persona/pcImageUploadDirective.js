angular.module('app').directive("imageUpload", ['Upload','$timeout', function(Upload, $timeout ) {
  return {
    restrict: 'E',
    templateUrl: '/partials/persona/imageUploader',
    link: function (scope, element, attrs) {
      scope.upload = function (dataUrl, name) {
        Upload.upload({
          url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          data: {
            file: Upload.dataUrltoBlob(dataUrl, name)
          },
        }).then(function (response) {
          $timeout(function () {
            scope.result = response.data;
          });
        }, function (response) {
          if (response.status > 0) scope.errorMsg = response.status
            + ': ' + response.data;
        }, function (evt) {
          scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
      }
    }

  }
}])
