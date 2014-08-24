/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';
    var AuthenticationService = function($scope, $http, $state, $rootScope, Constants){
        var _authorizationConfig = {

            /* List all the roles you wish to use in the app
             * You have a max of 31 before the bit shift pushes the accompanying integer out of
             * the memory footprint for an integer
             */
            roles :[
                'public',
                'user',
                'office',
                'sitemanager',
                'executive',
                'admin',
                'inivsible'],

            /*
             Build out all the access levels you want referencing the roles listed above
             You can use the "*" symbol to represent access to all roles
             */
            accessLevels : {
                'public' : "*",
                'anon': ['public', 'admin', 'executive'],
                'user' : ['user', 'admin'],
                'office': ['office', 'executive', 'admin'],
                'executive': ['executive', 'admin'],
                'admin': ['admin'],
                'invisible': []
            }

        };

        /*
         Method to build a distinct bit mask for each role
         It starts off with "1" and shifts the bit to the left for each element in the
         roles array parameter
         */
        var _buildRoles = function(roles){
            var bitMask = "01";
            var userRoles = {};

            for(var role in roles){
                var intCode = parseInt(bitMask, 2);
                userRoles[roles[role]] = {
                    bitMask: intCode,
                    title: roles[role]
                };
                bitMask = (intCode << 1 ).toString(2)
            }

            return userRoles;
        };

        var _buildAccessLevels = function(accessLevelDeclarations, userRoles){
            var accessLevels = {};
            for(var level in accessLevelDeclarations){

                if(typeof accessLevelDeclarations[level] == 'string'){
                    if(accessLevelDeclarations[level] == '*'){

                        var resultBitMask = '';

                        for( var role in userRoles){
                            resultBitMask += "1"
                        }
                        //accessLevels[level] = parseInt(resultBitMask, 2);
                        accessLevels[level] = {
                            bitMask: parseInt(resultBitMask, 2)
                        };
                    }
                    else
                        console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'")

                }
                else {

                    var resultBitMask = 0;
                    for(var role in accessLevelDeclarations[level]){
                        if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
                            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask
                        else console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'")
                    }
                    accessLevels[level] = {
                        bitMask: resultBitMask
                    };
                }
            }

            return accessLevels;
        };

        var _userRoles = function(){
            $scope.model.buildRoles($scope.model.authorizationConfig.roles);
        };

        var _accessLevels = function(){
            $scope.model.buildAccessLevels($scope.model.authorizationConfig.accessLevels, $scope.model.userRoles());
        };

        $scope.model = {
            buildRoles: _buildRoles,
            buildAccessLevels: _buildAccessLevels,
            authorizationConfig: _authorizationConfig,
            userRoles: _userRoles,
            rolesList: _authorizationConfig.roles,
            accessLevels: _accessLevels
        }
    };

    angular.module('alpine').factory('AuthenticationService', ['$http', '$scope', '$state', '$rootScope', 'Constants', AuthenticationService]);
})();