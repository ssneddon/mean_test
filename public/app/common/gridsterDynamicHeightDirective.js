angular.module('app').directive('gridsterDynamicHeight', gridsterDynamicHeight);

gridsterDynamicHeight.$inject = [];
function gridsterDynamicHeight(){

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

      var rowHeightOption = 75; // Change this value with your own rowHeight option
      var height = rowHeightOption * scope.$parent.persona.grid.sizeY;
      if(newVal > height){

        var div = Math.floor(newVal / rowHeightOption);
        div++;
        scope.$parent.persona.grid.sizeY = div;
      }
    });
  }
}
