// this is the start of the angular implementation. define a module - called app - and require ngRoute and ngResource
angular.module('app', ['ngResource', 'ngRoute']);
//location provider provides for html5
angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    // Angular is telling the server, that when a request is made for the index page, serve the /partials/main/main templateUrl and mvMainCtrl controller to the ng-view directive in the index.jade file
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
          controller: 'mvUserListCtrl',
          resolve: {
            auth: function(mvIdentity, $q) {
              var dfd = $q.defer();
              if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') > -1) {
                return true;
              }else {
                dfd.reject('not authorized');
              }
              return dfd.promise
            }
          }});
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
})


