/**
 *
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var RestService = function($http, $rootScope, $q, AlertsService, Constants){

        var _URLS = {
            LOGIN_URL: this.BASE_PUBLIC_URL + 'login',
            PROFILE_BY_ID_URL: this.BASE_API_URL + 'profile/{0}'
        }

        var _getData = function(url, successCallback, errorCallback, errorMessage){
            var deferred = $q.defer();
            $rootScope.loading = true;
            $http.get(url)
                .success(function(data){
                    $rootScope.loading = false;
                    deferred.resolve(data);
                    if(successCallback){
                        successCallback(data);
                    } else {
                        this.defaultSuccessCallback(data)
                    }
                })
                .error(function(data){
                    $rootScope.loading = false;
                    deferred.reject();
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        this.processError(data, errorMessage);
                    }
                });
            return deferred.promise;
        };

        var _postData = function(url, data, successCallback, errorCallback, errorMessage){
            var deferred = $q.defer();
            $rootScope.loading = true;
            console.log(data);
            $http.post(url, data)
                .success(function(data){
                    $rootScope.loading = false;
                    deferred.resolve(data);
                    if(successCallback){
                        successCallback(data);
                    } else {
                        this.defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    deferred.reject();
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        this.processError(data, errorMessage);
                    }
                });
            return deferred.promise;
        };

        var _putData = function(url, data, successCallback, errorCallback, errorMessage){
            var deferred = $q.defer();
            $rootScope.loading = true;
            console.log(data);
            $http.post(url, data)
                .success(function(data){
                    $rootScope.loading = false;
                    deferred.resolve(data);
                    if(successCallback){
                        successCallback(data);
                    } else {
                        this.defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    deferred.reject();
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        this.processError(data, errorMessage);
                    }
                });
            return deferred.promise;
        };

        var _deleteData = function(url, data, successCallback, errorCallback, errorMessage){
            var deferred = $q.defer();
            $rootScope.loading = true;
            console.log(data);
            $http.post(url, data)
                .success(function(data){
                    $rootScope.loading = false;
                    deferred.resolve(data);
                    if(successCallback){
                        successCallback(data);
                    } else {
                        this.defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    deferred.reject();
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        this.processError(data, errorMessage);
                    }
                });
            return deferred.promise;
        };

        var _defaultSuccessCallback = function(data){
            console.log('success!! {0}', data);
        };

        var _processError = function(data, errorMessage){
            if(errorMessage){
                AlertsService.addAlert(errorMessage, Constants.ALERTS.ERROR_MESSAGE, true);
            }
        };

        return {
            defaultSuccessCallback: _defaultSuccessCallback,
            getData: _getData,
            postData: _postData,
            putData: _putData,
            deleteData: _deleteData,
            processError: _processError,
            BASE_PUBLIC_URL: 'http://alpine.localhost/',
            BASE_API_URL: 'http://api.alpine.localhost/',
            URLS: _URLS
        }
    };

    ramAngularApp.module.factory('RestService', ['$http', '$rootScope', '$q', 'AlertsService', 'Constants', RestService]);
})();
