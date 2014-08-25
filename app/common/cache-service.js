/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){

    var CacheService = function(){

        var _cacheItems = {
            SelectedUser: {
                fullProfile: 'fullProfile'
            },
            Reports: {
                growerReport: 'growerReport',
                averyLabels: 'averyLabels'
            },
            Profile: {
                selectedGrower: 'selectedGrower',
                selectedCropYear: 'selectedCropYear'
            }
        };

        var _setItem = function(key, val) {
            var setVal = JSON.stringify(val);
            sessionStorage.setItem(key, setVal);
            return setVal;
        };

        var _getItem = function(item) {
            return angular.fromJson(sessionStorage.getItem(item));
        };

        var _removeItem = function(item) {
            sessionStorage.removeItem(item);
        };


        return {
            setItem: _setItem,
            getItem: _getItem,
            removeItem: _removeItem,
            Items: _cacheItems
        }
    };

    ramAngularApp.module.factory('CacheService', [CacheService]);
})();
