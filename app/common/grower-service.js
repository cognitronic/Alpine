/**
 * Created by Danny Schreiber on 9/17/14.
 */
(function(){

    'use strict';
    var GrowerService = function($q, RestService, Constants){

        var _getGrowers = function(){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_GROWERS, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_ASSESSMENTS_LOAD);
            return deferred.promise;
        };

        var _getGrowerNotes = function(growerId){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_GROWER_NOTES + growerId, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_ASSESSMENTS_LOAD);
            return deferred.promise;
        };

        return {
            getGrowers: _getGrowers,
            getGrowerNotes: _getGrowerNotes
        }
    };

    ramAngularApp.module.factory('GrowerService', ['$q', 'RestService', 'Constants', GrowerService]);
})();