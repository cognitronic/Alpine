/**
 *
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var RestService = function($http, $rootScope, $q, AlertsService, Constants){

        var BASE_PUBLIC_URL = 'http://alpine.localhost/',
            BASE_API_URL = 'http://api.alpine.localhost/api/',
            BASE_REPORTS_URL = 'http://alpinereports.localhost/';

        var _URLS = {
            LOGIN_URL: BASE_API_URL + 'login',
            PROFILE_BY_ID_URL: BASE_API_URL + 'profile/{0}',
            ASSESSMENTS: BASE_API_URL + 'assessments',
            GET_ASSESSMENT: BASE_API_URL + 'assessments/{0}',
            GET_VARIETIES: BASE_API_URL + 'varieties',
            GET_PAYMENT_SCHEDULES: BASE_API_URL + 'paymentschedules?cropyear=',
            PUT_PAYMENT_SCHEDULES: BASE_API_URL + 'paymentschedules/',
            GET_GROWERS: BASE_API_URL + 'growers/',
            GROWER_NOTES: BASE_API_URL + 'notes/',
            GET_GROWER_ASSESSMENTS: BASE_API_URL + 'grower-assessments/',
            GET_GROWER_PAYEES: BASE_API_URL + 'profile/payees/',
            GROWER_SCHEDULE: BASE_API_URL + 'profile/schedule/',
            GROWER_PAYMENT: BASE_API_URL + 'profile/payment/',
            GROWER_PAYEES: BASE_API_URL + 'profile/payees/'
        }

        var _getData = function(url, successCallback, errorCallback, errorMessage){
            $rootScope.loading = true;
            $http.get(url)
                .success(function(data){
                    $rootScope.loading = false;
                    if(successCallback){
                        successCallback(data);
                    } else {
                        _defaultSuccessCallback(data)
                    }
                })
                .error(function(data){
                    $rootScope.loading = false;
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        _processError(data, errorMessage);
                    }
                });
        };

        var _postData = function(url, data, successCallback, errorCallback, errorMessage){
            $rootScope.loading = true;
            console.log(data);
            $http.post(url, data)
                .success(function(data){
                    $rootScope.loading = false;
                    if(successCallback){
                        successCallback(data);
                    } else {
                        _defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        _processError(data, errorMessage);
                    }
                });
        };

        var _putData = function(url, data, successCallback, errorCallback, errorMessage){
            $rootScope.loading = true;
            console.log(data);
            $http.put(url, data)
                .success(function(data){
                    $rootScope.loading = false;
                    if(successCallback){
                        successCallback(data);
                    } else {
                        _defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        _processError(data, errorMessage);
                    }
                });
        };

        var _deleteData = function(url, successCallback, errorCallback, errorMessage){
            $rootScope.loading = true;
            $http.delete(url)
                .success(function(data){
                    $rootScope.loading = false;
                    if(successCallback){
                        successCallback(data);
                    } else {
                        _defaultSuccessCallback(data)
                    }
                })
                .error(function(){
                    $rootScope.loading = false;
                    if(errorCallback){
                        errorCallback(errorMessage);
                    } else {
                        _processError(null, errorMessage);
                    }
                });
        };

        var _defaultSuccessCallback = function(data){
            console.log('success!! {0}', data);
        };

        var _processError = function(data, errorMessage){
            if(errorMessage){
                AlertsService.addAlert(errorMessage, Constants.ALERT_TYPE.ERROR, true);
            }
        };

        return {
            defaultSuccessCallback: _defaultSuccessCallback,
            getData: _getData,
            postData: _postData,
            putData: _putData,
            deleteData: _deleteData,
            processError: _processError,
            URLS: _URLS,
            BASE_PUBLIC_URL: BASE_PUBLIC_URL,
            BASE_API_URL: BASE_API_URL,
            BASE_REPORTS_URL: BASE_REPORTS_URL
        }
    };

    ramAngularApp.module.factory('RestService', ['$http', '$rootScope', '$q', 'AlertsService', 'Constants', RestService]);
})();
