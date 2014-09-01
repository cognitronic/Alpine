/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var ScheduleController = function($scope, EventService, ScheduleService, CacheService){

        var _selectedCropYear = '2014';
        var _cropYears = [];

        var _init = function(){
            ScheduleService.getCropYears().then(function(data){
                $scope.model.cropYears = data;
                $scope.model.selectedCropYear = $scope.model.cropYears[1];
                CacheService.setItem(CacheService.Items.SelectedCropYear, $scope.model.selectedCropYear);
                EventService.pub('CropYearChanged', CacheService.getItem(CacheService.Items.SelectedCropYear));
            });
        };

        var _reloadData = function(){
          CacheService.setItem(CacheService.Items.SelectedCropYear, $scope.model.selectedCropYear.trim());
            console.log(CacheService.getItem(CacheService.Items.SelectedCropYear));
          EventService.pub('CropYearChanged', CacheService.getItem(CacheService.Items.SelectedCropYear));
        };

        $scope.model = {
            init: _init,
            selectedCropYear: _selectedCropYear,
            cropYears: _cropYears,
            reloadData: _reloadData
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ScheduleController', ['$scope', 'EventService', 'ScheduleService', 'CacheService', ScheduleController]);
})();