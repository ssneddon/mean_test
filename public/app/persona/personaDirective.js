angular.module('psMenu').directive('mvPersonaList', ['mvIdentity', function (mvIdentity) {
    return {
        restrict: 'E',
        templateUrl: '../main/personas',
        link: function (scope, el, attr) {
            var item = el.find('.ps-selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);
