/**
 * Created by Danny Schreiber on 9/3/14.
 */

(function(){
    'use strict';

    var link = function(scope, element, attrs){
        var dialogProvider = element.injector().get('DialogsService');
        var templateFile = attrs.ramCustomModal;
        var controller = attrs.ramModalController;
        var title = attrs.ramModalTitle || 'Alpine Pacific';
        scope.dialogModel = {
          header:   title
        };
        element.bind('click', function(event){
            console.log('hello');
           if(scope.ramOnLoadModalAction)
                scope.$eval(scope.ramOnLoadModalAction);
            var dialog = dialogProvider.create(templateFile, controller, scope.dialogModel);
            dialog.result.then(function(){
                if(scope.ramPostSubmitAction){
                    scope.$eval(scope.ramPostSubmitAction);
                }
            }, function(){
               if(scope.ramPostCancelAction){
                   scope.$eval(scope.ramPostCancelAction);
               }
            });
        });
    };

    var ramCustomModal = function(){
        return {
            restrict: 'A',
            link:link,
            scope: {
                ramPostSubmitAction: '&',
                ramPostCancelAction: '&',
                ramOnLoadModalAction: '&'
            }
        }
    };

    ramAngularApp.module.directive('ramCustomModal', ramCustomModal);
})();