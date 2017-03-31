angular.module('app').directive("imageUpload", function () {
  return {
    restrict: 'E'
    , templateUrl: '/partials/persona/imageUploader'
    , link: function (scope, element, attrs) {

      scope.myImage = '';
      scope.smallImage = '';

      scope.cardArrange = function () {
       // var imageInput = angular.element(document).find('#inputFile');
        //var imageInput = angular.element(document.querySelector('#input'))
        //console.log(imageInput);
        //imageInput.css('background-color', 'red');
        element.parent().addClass("highCard");
      };

      scope.cardClassRemove = function () {
        console.log(element.parent());
        element.parent().removeClass("highCard");
        scope.picFile = '';
        scope.croppedDataUrl = '';
      };

      scope.upload = function (croppedImage) {
        scope.persona.cardInfo.croppedImage = croppedImage;
      }

    }
  }
})
