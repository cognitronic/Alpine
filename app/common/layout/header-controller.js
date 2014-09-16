/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var HeaderController = function($scope, AuthenticationService, CacheService){

        var _init = function(){

        };

        var _getLoggedOnUser = function(){
            if(CacheService.getItem(CacheService.Items.SelectedUser.fullProfile)){
                var user = CacheService.getItem(CacheService.Items.SelectedUser.fullProfile);
                return user.first + ' ' + user.last;
            }
        };
        $scope.model = {
            init: _init,
            logOut: AuthenticationService.logOut,
            isAuthenticated: AuthenticationService.isAuthenticated,
            getLoggedOnUser: _getLoggedOnUser
        };
    };

    angular.module('alpine').controller('HeaderController', ['$scope', 'AuthenticationService', 'CacheService', HeaderController]);
})();