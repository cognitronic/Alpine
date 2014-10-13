/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';
    var AuthenticationService = function($http, $q, $state, $rootScope, RestService, CacheService, Constants){

        var _accessLevels = ramRoutingAccessConfig.accessLevels;
        var _userRoles = ramRoutingAccessConfig.userRoles;

        var _login = function(creds){
            var deferred = $q.defer();
            var successCb = function(user){
                if(user != 'null' && user != null){
                    CacheService.setItem(CacheService.Items.SelectedUser.fullProfile, user);
                    $state.go('root.schedule.details');
                    deferred.resolve(user);
                } else {
                    CacheService.removeItem(CacheService.Items.SelectedUser.fullProfile);
                    deferred.resolve(Constants.MESSAGES.ERROR.FAILED_LOGIN_ATTEMPT);
                    console.log('invalid login');
                }
            };

            RestService.postData(RestService.URLS.LOGIN_URL, creds, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOGIN_ATTEMPT);
            return deferred.promise;
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

        var _isAuthenticated = function(){
            if(CacheService.getItem(CacheService.Items.SelectedUser.fullProfile)){
                return true;
            }
            return false;
        };
        var _logout = function(){
            CacheService.removeItem(CacheService.Items.SelectedUser.fullProfile);
            //$rootScope.$broadcast('userLoggedOut', {user: null});
            $state.go('root.login');
        };

        return {
            userRoles: _userRoles,
            accessLevels: _accessLevels,
            login: _login,
            isAuthenticated: _isAuthenticated,
            authorize: _authorize,
            logOut: _logout
        }
    };

    ramAngularApp.module.factory('AuthenticationService', ['$http', '$q', '$state', '$rootScope', 'RestService', 'CacheService', 'Constants', AuthenticationService]);
})();