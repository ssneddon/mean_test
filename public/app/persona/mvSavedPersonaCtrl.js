angular.module('app').controller('mvSavedPersonaCtrl', function($scope, $routeParams, $location, mvAuth, mvIdentity, mvNotifier) {

  $scope.personaId = $routeParams.personaId;

  angular.forEach(mvIdentity.currentUser.personaCollection, function(persona) {
    if(persona._id === $routeParams.personaId) {
      $scope.personaLayout = persona.personaDetails
    }
  });

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

  $scope.deleteDashboardLayout = function () {

    var deletedPersonaData = {
      personaDetails: $scope.personaLayout
    };

    var personaId = $scope.personaId;

    mvAuth.deleteUserPersona(deletedPersonaData, personaId).then(function() {
      mvNotifier.notify('Your persona has been delete');
      $location.path('/main');

    }, function(reason) {
      mvNotifier.error(reason);
    })
  };

  $scope.updateDashboardLayout = function () {

    var updatedPersonaData = {
      personaDetails: $scope.personaLayout,
      _id: $routeParams.personaId
    };

    mvAuth.updateUserPersona(updatedPersonaData).then(function() {
      mvNotifier.notify('Your persona has been updated');
      $location.path('/main');

    }, function(reason) {
      mvNotifier.error(reason);
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
