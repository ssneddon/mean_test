angular.module('app').directive('gridsterDynamicHeight', ['$window', gridsterDynamicHeight]);

gridsterDynamicHeight.$inject = [];
function gridsterDynamicHeight($window){

  var directive = {
    scope: {
      persona: "=" //gridster item
    },
    link: link,
    restrict: 'A'
  };
  return directive;

  function link(scope, element, attrs) {

    scope.$watch(function() {

      return element[0].scrollHeight;
    },
        function(newVal, oldVal) {
        var rowHeightOption;
     if($window.innerWidth > 992){
            rowHeightOption = 100;
        }
        else {
            rowHeightOption = 75
        }
       // Change this value with your own rowHeight option
      var height = rowHeightOption * scope.$parent.persona.grid.sizeY;
      if(newVal > height){

        var div = Math.floor(newVal / rowHeightOption);
        if($window.innerWidth > 992){
            div++;
           }
        scope.$parent.persona.grid.sizeY = div;
      }
       if(newVal != 0 && newVal < height){

        //$window.innerWidth;

        var div = Math.floor(newVal / rowHeightOption) + 2;
           if($window.innerWidth < 992){
            div++;
           }
        scope.$parent.persona.grid.sizeY = div;
      }
    });
  }
}
