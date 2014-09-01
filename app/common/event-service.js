/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';
    var EventService = function($rootScope){

        var _pub = function(name, data){
            console.log('pub: ' + name + ' data: ' + data);
            $rootScope.$emit(name, data);
        };

        var _sub = function(name, handler){
            console.log('sub: ' + name + ' handler: ' + handler);
            $rootScope.$on(name, function(event, message){
                console.log('sub: ' + name + ' message: ' + message);
               handler(message);
            });
        };

        return {
            pub: _pub,
            sub: _sub
        }
    };

    ramAngularApp.module.factory('EventService', ['$rootScope', EventService]);
})();