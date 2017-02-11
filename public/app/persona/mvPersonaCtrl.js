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

    $scope.personaLayout ={

        "personaTitle": "Persona Title",
        "personaInfo": [
            {"grid":{"sizeX":4,"sizeY":3,"row":0,"col":0},"cardInfo":{"cardTitle":"Persona Name"}},
            {"grid":{"sizeX":4,"sizeY":3,"row":0,"col":4},"cardInfo":{"cardTitle":"Biography"}},
            {"grid":{"sizeX":4,"sizeY":3,"row":0,"col":8},"cardInfo":{"cardTitle":"Identifiers"}},
            {"grid":{"sizeX":4,"sizeY":3,"row":3,"col":0},"cardInfo":{"cardTitle":"Demographics"}},
            {"grid":{"sizeX":4,"sizeY":3,"row":3,"col":4},"cardInfo":{"cardTitle":"Goals"}},
            {"grid":{"sizeX":4,"sizeY":3,"row":3,"col":8},"cardInfo":{"cardTitle":"Always/Never"}}
        ]

    };

    $scope.addNewCard = function() {
        var newCard = {"grid":{"sizeX":4,"sizeY":3},"cardInfo":{"cardTitle":"New Card"}};
           // newCardCopy = angular.copy(newCard);

        $scope.personaLayout.personaInfo.push(newCard);
        console.log($scope.personaLayout);
    };

    $scope.removeCard = function() {
        console.log(this.$parent.persona);
        var thisCard = $scope.personaLayout.personaInfo.indexOf(this.$parent.persona);
        console.log(thisCard);
        $scope.personaLayout.personaInfo.splice(thisCard, 1);
        console.log($scope.personaLayout);
    };

    $scope.saveDashboardLayout = function () {
        //sessionStorage.personaLayout = angular.toJson($scope.personaLayout);
        //console.log(sessionStorage.personaLayout);
        var newPersonaData = {
            personaDetails: $scope.personaLayout
        }

        mvAuth.updateUserPersonas(newPersonaData).then(function() {
            mvNotifier.notify('Your user account has been updated');
        }, function(reason) {
            mvNotifier.error(reason);
        })
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
