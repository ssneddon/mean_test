angular.module('app').controller('pcPersonaCtrl', function($scope, $location, pcAuth, pcIdentity, pcNotifier) {

    $scope.gridsterOpts = {
        columns: 12
        , margins: [30, 10]
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
            {"grid":{"sizeX":4,"sizeY":4,"row":0,"col":0},"cardInfo":{"cardTitle":"Persona Name","cardBody":"Text here..."}},
            {"grid":{"sizeX":4,"sizeY":4,"row":0,"col":4},"cardInfo":{"cardTitle":"Biography","cardBody":"Text here..."}},
            {"grid":{"sizeX":4,"sizeY":4,"row":0,"col":8},"cardInfo":{"cardTitle":"Identifiers","cardBody":"Text here..."}},
            {"grid":{"sizeX":4,"sizeY":4,"row":3,"col":0},"cardInfo":{"cardTitle":"Demographics","cardBody":"Text here..."}},
            {"grid":{"sizeX":4,"sizeY":4,"row":3,"col":4},"cardInfo":{"cardTitle":"Goals","cardBody":"Text here..."}},
            {"grid":{"sizeX":4,"sizeY":4,"row":3,"col":8},"cardInfo":{"cardTitle":"Always/Never","cardBody":"Text here..."}}
        ]

    };

    $scope.addNewCard = function() {
        var newCard = {"grid":{"sizeX":4,"sizeY":4},"cardInfo":{"cardTitle":"New Card","cardBody":"Text here..."}};

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
        sessionStorage.personaLayout = angular.toJson($scope.personaLayout);
        console.log(sessionStorage.personaLayout);
        var newPersonaData = {
            personaDetails: $scope.personaLayout
        }

        pcAuth.addUserPersona(newPersonaData).then(function() {
            pcNotifier.notify('Your new persona has been added to your account');
            $location.path('/main');
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
