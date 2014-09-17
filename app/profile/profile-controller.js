/**
 * Created by Danny Schreiber on 8/24/14.
 */
(function(){
    'use strict';

    var ProfileController = function($scope, $state, EventService, ScheduleService, CacheService, GrowerService){
        var _selectedCropYear = '2014';
        var _cropYears = [];
        var _growers = [];
        var _selectedGrower = {};

        var _init = function(){
            _loadCropYears();
            _loadGrowers();
        };

        var _loadGrowers = function(){
            GrowerService.getGrowers().then(function(data){
                $scope.model.growers = data;
                $scope.model.selectedGrower = $scope.model.growers[0];
                CacheService.setItem(CacheService.Items.Profile.selectedGrower, $scope.model.selectedGrower);
            });
        };

        var _loadCropYears = function(){
            ScheduleService.getCropYears().then(function(data){
                $scope.model.cropYears = data;
                $scope.model.selectedCropYear = $scope.model.cropYears[1];
                CacheService.setItem(CacheService.Items.SelectedCropYear, $scope.model.selectedCropYear);
            });
        };

        var _reloadData = function(){
            CacheService.setItem(CacheService.Items.SelectedCropYear, $scope.model.selectedCropYear);
            CacheService.setItem(CacheService.Items.Profile.selectedGrower, angular.fromJson($scope.model.selectedGrower));
            EventService.pub('SelectedProfileChanged', {'cropyear': CacheService.getItem(CacheService.Items.SelectedCropYear), 'grower': CacheService.getItem(CacheService.Items.Profile.selectedGrower)});
            //$state.go('root.profile.details');
        };

        $scope.model = {
            init: _init,
            selectedCropYear: _selectedCropYear,
            cropYears: _cropYears,
            reloadData: _reloadData,
            growers: _growers,
            selectedGrower: _selectedGrower
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileController', ['$scope', '$state', 'EventService', 'ScheduleService', 'CacheService', 'GrowerService',ProfileController]);
})();