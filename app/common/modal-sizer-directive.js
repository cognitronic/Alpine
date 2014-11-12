/**
 * Created by Danny Schreiber on 11/9/2014.
 */
(function(){
    'use strict';
    var link = function(scope, element, attr){
        var height = scope.ramHeight || 565;
        var width = scope.ramWidth || 962;
        var marginLeft = Math.ceil(width/2)*-1;
        var marginTop = Math.ceil(height/2)*-1;

        element.css('height', height);
        element.css('width', width);
        element.css('margin-top', marginTop);
        element.css('margin-left', marginLeft);

    };

    var ramModal = function(){
        return{
            scope: {
                ramHeight: '=',
                ramWidth: '='
            },

            restrict: 'EA',
            link: link
        }
    };

    ramAngularApp.module.directive('ramModal', ramModal);
})();