/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileAssessmentsController = function($scope){

        var _init = function(){

        };

        $scope.model = {
            init: _init
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileAssessmentsController', ['$scope', ProfileAssessmentsController]);
})();