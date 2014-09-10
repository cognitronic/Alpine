/**
 * Created by Danny Schreiber on 8/23/14.
 */

(function(){
    'use strict';

    var link = function(scope, element, attr){
        scope.$watch('loading', function(val){
           if(val){
               $(element).show();
           } else {
               $(element).hide();
           }
        });
    };

    var restLoader = function(){
        return{
            restrict: 'E',
            link: link,
            replace: true,
            template: '<div class="loadingContainer"><div class="loading"><img src="../assets/img/spinner-blue.gif" width="60" height="60"/>Loading...</div></div>'
        }
    };

    ramAngularApp.module.directive('restLoader', restLoader);
})();