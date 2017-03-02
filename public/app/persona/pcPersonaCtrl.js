angular.module('app').controller('pcPersonaCtrl', function($scope, pcAuth, pcIdentity, pcNotifier) {

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

        pcAuth.addUserPersona(newPersonaData).then(function() {
            pcNotifier.notify('Your new persona has been added to your account');
        }, function(reason) {
            pcNotifier.error(reason);
        })
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
    };
 /* $scope.cardArrange = function() {
    var thisCard = this.$parent.$element;
    console.log(thisCard);
    //thisCard.addClass("higherCard");
  }*/

})
