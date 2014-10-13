/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';
    var EventService = function($rootScope){
        var _destroyScope = function(scope, unsubscribe){
            scope.$on('$destroy', unsubscribe);
        };

        var _pub = function(name, message){
            console.log('pub: ' + name + ' message: ' + message);
            $rootScope.$emit(name, message);
        };

        var _sub = function(scope, name, handler){
            console.log('sub: ' + name + ' handler: ' + handler);
            var unsubscribe = $rootScope.$on(name, function(event, message){
                console.log('sub: ' + name + ' message: ' + message);
               handler(message);
            });
            _destroyScope(scope, unsubscribe);
        };

        return {
            pub: _pub,
            sub: _sub
        }
    };

    ramAngularApp.module.factory('EventService', ['$rootScope', EventService]);
})();