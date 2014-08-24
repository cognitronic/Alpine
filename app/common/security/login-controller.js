/**
 * Created by Danny Schreiber on 8/24/14.
 */
(function(){
    'use strict';

    var LoginController = function($scope, AuthenticationService){
        var _credentials = {
            email: '',
            password: ''
        };

        var _login = function(creds){
          AuthenticationService.login(creds);
        };

        $scope.model = {

        }
    };

    angular.module('alpine').controller('LoginController', ['$scope', 'AuthenticationService', LoginController]);
})();