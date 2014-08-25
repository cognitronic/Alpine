/**
 * Created by Danny Schreiber on 8/24/14.
 */
(function(){
    'use strict';

    var LoginController = function($scope, AuthenticationService, Constants){
        var _credentials = {
            email: '',
            password: ''
        };

        var _message = '';

        var _login = function(creds){
            $scope.model.message = AuthenticationService.login(creds);
        };

        $scope.model = {
            login: _login,
            credentials: _credentials,
            message: _message
        }
    };

    ramAngularApp.module.controller('LoginController', ['$scope', 'AuthenticationService', 'Constants', LoginController]);
})();