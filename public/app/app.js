angular.module('app', ['ngResource', 'ngRoute', 'gridster','ngImgCrop', 'ngFileUpload']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(pcAuth) {
            return pcAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(pcAuth) {
            return pcAuth.authorizeAuthenticatedUserForRoute()
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: 'partials/main/main'})
        .when('/main', { templateUrl: '/partials/main/userMain',
            controller: 'pcMainCtrl', resolve: routeRoleChecks.user
        })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'pcUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'pcSignupCtrl'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'pcProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/new-persona', { templateUrl: '/partials/persona/newPersona',
            controller: 'pcPersonaCtrl', resolve: routeRoleChecks.user
        })
      .when('/persona/:personaId', { templateUrl: '/partials/persona/savedPersona',
            controller: 'pcSavedPersonaCtrl', resolve: routeRoleChecks.user
        })


});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
})
