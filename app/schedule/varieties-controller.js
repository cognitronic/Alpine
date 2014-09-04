/**
 * Created by Danny Schreiber on 9/3/14.
 */
(function(){
    'use strict';

    var VarietiesController = function($scope, DialogsService, VarietiesService, modalResolveData){

        var _varieties = [];

        var _getVarieties = function(){
            VarietiesService.getVarieties().then(function(data){
                $scope.model.varieties = data;
            });
        };

        var _init = function(){
            $scope.model.getVarieties();
        };

        $scope.model = {
            header: modalResolveData.header,
            varieties: _varieties,
            getVarieties: _getVarieties,
            init: _init
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('VarietiesController', ['$scope', 'DialogsService', 'VarietiesService', 'modalResolveData', VarietiesController]);
})();