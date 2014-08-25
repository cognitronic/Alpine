/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var AlertsService = function(CacheService, Constants){
        var _alerts = [];
        var _timeout = 10000;

        var _autoCloseAlert = function(index){
              this.alerts.splice(index, 1)
        };

        var _closeAlert = function(index){
            this.alerts.splice(index, 1);
        };

        var _addAlert = function(msg, msgType, persist){
            var _alert = {
                msg: msg,
                msgType: msgType,
                persist: persist
            };
            if(CacheService.getItem(Constants.CACHE_ITEMS.ALERTS)){
                CacheService.getItem(Constants.CACHE_ITEMS.ALERTS).push(_alert);
            } else {
                var newAlert = [];
                newAlert.push(_alert);
                CacheService.setItem(Constants.CACHE_ITEMS.ALERTS, newAlert);
            }
        };

        var _getAlerts = function(){
            return this.alerts;
        };

        return {
            alerts: _alerts,
            timeout: _timeout,
            autoCloseAlert: _autoCloseAlert,
            addAlert: _addAlert,
            closeAlert: _closeAlert,
            getAlerts: _getAlerts
        }
    };

    ramAngularApp.module.factory('AlertsService', ['CacheService', 'Constants', AlertsService]);
})();