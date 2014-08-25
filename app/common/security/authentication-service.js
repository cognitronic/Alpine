/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';
    var AuthenticationService = function($http, $state, $rootScope, RestService, CacheService, Constants){

        var _accessLevels = ramRoutingAccessConfig.accessLevels;
        var _userRoles = ramRoutingAccessConfig.userRoles;

        var _login = function(creds){

            var successCb = function(data){
                data.then(function(user){
                    if(user){
                        CacheService.setItem(CacheService.Items.SelectedUser.fullProfile, user);
                        $state.go('root.profile');
                    } else {
                        CacheService.removeItem(CacheService.Items.SelectedUser.fullProfile);
                        return Constants.MESSAGES.ERROR.FAILED_LOGIN_ATTEMPT;
                        console.log('invalid login');
                    }
                });

            };

            RestService.postData(RestService.URLS.LOGIN_URL, creds, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOGIN_ATTEMPT);
        };

        var _isAuthenticated = function(){
            return CacheService.getItem(CacheService.Items.SelectedUser.fullProfile);
        };

        var _authorize = function(accessLevel, role){
            if(role === undefined) {
                if(!CacheService.getItem(CacheService.Items.SelectedUser.fullProfile)){
                    role = this.userRoles["public"];
                } else {
                    role = this.userRoles[CacheService.getItem(CacheService.Items.SelectedUser.fullProfile).role];
                }
            }
            return accessLevel.bitMask & role.bitMask;
        };

        return {
            userRoles: _userRoles,
            accessLevels: _accessLevels,
            login: _login,
            isAuthenticated: _isAuthenticated,
            authorize: _authorize
        }
    };

    ramAngularApp.module.factory('AuthenticationService', ['$http', '$state', '$rootScope', 'RestService', 'CacheService', 'Constants', AuthenticationService]);
})();