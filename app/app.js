/**
 * Created by Danny Schreiber on 8/23/14.
 */
var ramAngularApp = ramAngularApp || {};
ramAngularApp.module = angular.module('alpine', ['ui.router', 'ui.bootstrap']);

    ramAngularApp.module.run(function($rootScope, $location, AuthenticationService, $state){
        $rootScope.$state = $state;
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
                $state.go('root.login');
            }
        });

        $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
            if(!AuthenticationService.authorize(currRoute.access)){
                $state.go('root.no-access');
                console.log('unauthorized');
            }
        });

    })
    .config(function($httpProvider, $stateProvider, $urlRouterProvider){
            var access = ramRoutingAccessConfig.accessLevels;
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
                access: access.anon,
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
                access: access.anon,
                views: {
                    'main-container@': {
                        templateUrl: 'common/security/no-access.html',
                        controller: 'NoAccessController'
                    }
                }
            })
            .state('root.profile', {
                url: '/profile',
                access: access.anon,
                views: {
                    'main-container@': {
                        templateUrl: 'profile/profile-index.html',
                        controller: 'ProfileController'
                    }
                }
            })
            .state('root.schedule', {
                url: '/schedule',
                access: access.anon,
                views: {
                    'main-container@': {
                        templateUrl: 'schedule/schedule-index.html',
                        controller: 'ScheduleController'
                    }
                }
            })
            .state('root.reports', {
                url: '/reports',
                access: access.anon,
                views: {
                    'main-container@': {
                        templateUrl: 'reports/reports-index.html',
                        controller: 'ReportsController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/profile');
    });