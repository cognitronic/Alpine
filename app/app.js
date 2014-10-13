/**
 * Created by Danny Schreiber on 8/23/14.
 */
var ramAngularApp = ramAngularApp || {};
ramAngularApp.module = angular.module('alpine', ['ui.router', 'ui.bootstrap','cc.widgets.position', 'dialogs.service']);

    ramAngularApp.module.config(function($httpProvider, $stateProvider, $urlRouterProvider, DialogsServiceProvider){
        DialogsServiceProvider.useCopy(false);
            var access = ramRoutingAccessConfig.accessLevels;
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };

        //sets the content type header globally for $http calls
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json; charset=UTF-8'};

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
                    initResolve: function(AuthenticationService, $state){

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
                access: access.admin,
                views: {
                    'main-container@': {
                        templateUrl: 'profile/profile-index.html',
                        controller: 'ProfileController'
                    }
                },
                onEnter: function($state, AuthenticationService){
                    if(!AuthenticationService.isAuthenticated()){
                        $state.go('root.login');
                    }
                }
            })
            .state('root.profile.details', {
                url:'/:name',
                access: access.admin,
                views: {
                    'notes@root.profile': {
                        templateUrl: 'profile/notes.html',
                        controller: 'ProfileNotesController'
                    },
                    'assessments@root.profile': {
                        templateUrl: 'profile/assessments.html',
                        controller: 'ProfileAssessmentsController'
                    },
                    'schedule@root.profile': {
                        templateUrl: 'profile/schedule.html',
                        controller: 'ProfileScheduleController'
                    },
                    'payment-history@root.profile': {
                        templateUrl: 'profile/payment-history.html',
                        controller: 'ProfilePaymentController'
                    },
                    'payees@root.profile': {
                        templateUrl: 'profile/payees.html',
                        controller: 'ProfilePayeesController'
                    }
                }
            })
            .state('root.schedule', {
                url: '',
                abstract: true,
                access: access.admin,
                views: {
                    'main-container@': {
                        templateUrl: 'schedule/schedule-index.html',
                        controller: 'ScheduleController'
                    }
                },
                onEnter: function($state, AuthenticationService){
                    if(!AuthenticationService.isAuthenticated()){
                        $state.go('root.login');
                    }
                }
            })
            .state('root.schedule.details', {
                url: '/schedule',
                access: access.admin,
                views: {
                    'payments@root.schedule': {
                        templateUrl: 'schedule/payments.html',
                        controller: 'PaymentSchedulesController'
                    },
                    'assessments@root.schedule': {
                        templateUrl: 'schedule/assessments.html',
                        controller: 'AssessmentsController'
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
                },
                onEnter: function($state, AuthenticationService){
                    if(!AuthenticationService.isAuthenticated()){
                        $state.go('root.login');
                    }
                }
            });

        $urlRouterProvider.otherwise('/schedule');
    })
    .run(function($rootScope, $location, AuthenticationService, $state){
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

    });