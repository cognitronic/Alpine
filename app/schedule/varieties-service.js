/**
 * Created by Danny Schreiber on 9/3/14.
 */

(function(){
    'use strict';
    var VarietiesService = function($q, RestService, CacheService, Constants){

        var _getVarieties = function(){
            var deferred = $q.defer();
            var success = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_VARIETIES, success, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        return {
            getVarieties: _getVarieties
        }
    };

    ramAngularApp.module.factory('VarietiesService', ['$q', 'RestService', 'CacheService', 'Constants', VarietiesService]);
})();