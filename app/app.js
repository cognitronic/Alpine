/**
 * Created by Danny Schreiber on 8/23/14.
 */

angular.module('alpine', ['restangular', 'ui.router', 'ui.bootstrap'])
    .run(function($rootScope, $state){
        $rootScope.$state = $state;
    })
    .config(function($httpProvider, $stateProvider, $urlRouterProvider){
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }
        //sets the content type header globally for $http calls
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'common/layout/header.html',
                        controller: 'HeaderController'
                    },
                    'footer': {
                        templateUrl: 'common/layout/footer.html',
                        controller: 'FooterController'
                    }
                },
                resolve: {
                    initResolve: function(){

                    }
                }
            })
            .state('root.login', {
                url:'/login',
                views: {
                    'main-container@': {
                        templateUrl: 'common/security/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('root.no-access', {
                url:'/noaccess',
                views: {
                    'main-container@': {
                        templateUrl: 'common/security/no-access.html',
                        controller: 'NoAccessController'
                    }
                }
            })
            .state('root.profile', {
                url: '/profile',
                views: {
                    'main-container@': {
                        templateUrl: 'profile/profile-index.html',
                        controller: 'ProfileController'
                    }
                }
            })
            .state('root.schedule', {
                url: '/schedule',
                views: {
                    'main-container@': {
                        templateUrl: 'schedule/schedule-index.html',
                        controller: 'ScheduleController'
                    }
                }
            })
            .state('root.reports', {
                url: '/reports',
                views: {
                    'main-container@': {
                        templateUrl: 'reports/reports-index.html',
                        controller: 'ReportsController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/profile');
    })
    .run(function($rootScope, $location, AuthenticationService){

        $rootScope.isVisible = true;

        var routesThatDontRequireAuth = ['/login'];

        var routeClean = function(route){
            return _.find(routesThatDontRequireAuth,
                function(noAuthRoute){
                    return (route == noAuthRoute);
                });
        };

        $rootScope.$on('$locationChangeStart', function(event, next, current){
            if(!routeClean($location.url()) && !AuthenticationService.isAuthenticated()){
                $location.path('/login');
            }
        });

        $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
            if(!AuthenticationService.authorize(currRoute.access)){
                $location.path('/noaccess');
                console.log('unauthorized');
            }
        });

    });