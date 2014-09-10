/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var HeaderController = function($scope, AuthenticationService){

        var _init = function(){

        };

        $scope.model = {
            init: _init,
            logOut: AuthenticationService.logOut,
            isAuthenticated: AuthenticationService.isAuthenticated
        };
    };

    angular.module('alpine').controller('HeaderController', ['$scope', 'AuthenticationService', HeaderController]);
})();