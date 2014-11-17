/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var AlertsService = function(CacheService){
        var _timeout = 10000;

        var _autoCloseAlert = function(index){
            CacheService.getItem(CacheService.Items.Alerts.alertsList).splice(index, 1)
            if(CacheService.getItem(CacheService.Items.Alerts.alertsList).length == 0){
                CacheService.removeItem(CacheService.Items.Alerts.alertsList);
            }
        };

        var _closeAlert = function(index){
            CacheService.getItem(CacheService.Items.Alerts.alertsList).splice(index, 1);
            if(CacheService.getItem(CacheService.Items.Alerts.alertsList).length == 0){
                CacheService.removeItem(CacheService.Items.Alerts.alertsList);
            }
        };

        var _addAlert = function(msg, msgType, persist){
            var _alert = {
                msg: msg,
                msgType: msgType,
                persist: persist
            };
            if(CacheService.getItem(CacheService.Items.Alerts.alertsList)){
                CacheService.getItem(CacheService.Items.Alerts.alertsList).push(_alert);
            } else {
                var newAlert = [];
                newAlert.push(_alert);
                CacheService.setItem(CacheService.Items.Alerts.alertsList, newAlert);
            }
        };

        var _getAlerts = function(){
            return CacheService.getItem(CacheService.Items.Alerts.alertsList);
        };

        return {
            alerts: CacheService.getItem(CacheService.Items.Alerts.alertsList),
            timeout: _timeout,
            autoCloseAlert: _autoCloseAlert,
            addAlert: _addAlert,
            closeAlert: _closeAlert,
            getAlerts: _getAlerts
        }
    };

    ramAngularApp.module.factory('AlertsService', ['CacheService', AlertsService]);
})();