angular.module('app').controller('pcSavedPersonaCtrl', function($scope, $routeParams, $location, pcAuth, pcIdentity, pcNotifier) {

  $scope.personaId = $routeParams.personaId;

  angular.forEach(pcIdentity.currentUser.personaCollection, function(persona) {
    if(persona._id === $routeParams.personaId) {
      $scope.personaLayout = persona.personaDetails
    }
  });

  $scope.gridsterOpts = {
    columns: 12
    , margins: [30, 10]
    , pushing: true
    , floating: true
    , resizable: {
      enabled: true
      , handles: ['se']
    }
    , width: 'auto'
  };

  $scope.addNewCard = function() {
    var newCard = {"grid":{"sizeX":4,"sizeY":3},"cardInfo":{"cardTitle":"New Card","cardBody":"Text here..."}};
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

  $scope.deleteDashboardLayout = function () {

    var deletedPersonaData = {
      personaDetails: $scope.personaLayout
    };

    var personaId = $scope.personaId;

    pcAuth.deleteUserPersona(deletedPersonaData, personaId).then(function() {
      pcNotifier.notify('Your persona has been deleted');
      $location.path('/main');

    }, function(reason) {
      pcNotifier.error(reason);
    })
  };

  $scope.updateDashboardLayout = function () {

    var updatedPersonaData = {
      personaDetails: $scope.personaLayout,
      _id: $routeParams.personaId
    };

    pcAuth.updateUserPersona(updatedPersonaData).then(function() {
      pcNotifier.notify('Your persona has been updated');
      //$location.path('/main');

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

})
