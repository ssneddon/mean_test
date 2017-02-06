angular.module('app').controller('mvPersonaCtrl', function($scope, mvAuth, mvIdentity, mvNotifier) {

    $scope.gridsterOpts = {
        columns: 12
        , margins: [30, 30]
        , pushing: true
        , floating: true
        , resizable: {
            enabled: true
            , handles: ['se']
        }
    };

    $scope.standardItems = [
        {"grid":{"sizeX":3,"sizeY":3,"row":0,"col":0},"cardInfo":{"cardTitle":"Persona Title"}},
        {"grid":{"sizeX":3,"sizeY":3,"row":0,"col":3},"cardInfo":{"cardTitle":"Biography"}},
        {"grid":{"sizeX":3,"sizeY":3,"row":0,"col":6},"cardInfo":{"cardTitle":"Identifiers"}},
        {"grid":{"sizeX":3,"sizeY":3,"row":3,"col":0},"cardInfo":{"cardTitle":"Demographics"}},
        {"grid":{"sizeX":3,"sizeY":3,"row":3,"col":3},"cardTitle":"Goals","cardInfo":{"cardTitle":"Goals"}},
        {"grid":{"sizeX":3,"sizeY":3,"row":3,"col":6},"cardInfo":{"cardTitle":"Always/Never"}}
    ];

    $scope.saveDashboardLayout = function () {
        sessionStorage.userSheets = angular.toJson(scope.userSheets);
        console.log(sessionStorage.userSheets);
    };
    $scope.loadDashboardLayout = function loadDashboardLayout() {
        scope.userSheets = angular.fromJson(sessionStorage.userSheets);
        console.log(scope.userSheets);
    };
    $scope.contentEnable = function() {
        $scope.gridsterOpts = {
            draggable:{
                enabled: false},
            resizable: {
                enabled: false
            }
        }
    };
    $scope.cardEnable = function() {

        $scope.gridsterOpts = {
            draggable:{
                enabled: true},
            resizable: {
                enabled: true
                , handles: ['se']
            }
        }

        console.log($scope.gridsterOpts)
    };

})
