/**
 * Created by Danny Schreiber on 8/31/14.
 */
(function(){
    'use strict';
    var AssessmentsController = function(EventService, $scope, ScheduleService, CacheService){
        var _assessments = {};

        var _getAssessments = function(cropYear){
            ScheduleService.getAssessments(cropYear).then(function(data){
                $scope.model.assessments = data;
            });
        };

        var _updateAssessments = function(){
            for(var i = 0, l = $scope.model.assessments.length; i<l; i++){
                ScheduleService.updateAssessments($scope.model.assessments[i]);
            }
        };

        var _init = function(){
            $scope.model.getAssessments(CacheService.getItem(CacheService.Items.SelectedCropYear));
        };

        var cropYearChangeListener = EventService.sub('CropYearChanged',function(message){
            $scope.model.init();
        });
        $scope.$on('$destroy', cropYearChangeListener);

        $scope.model = {
            init: _init,
            assessments: _assessments,
            getAssessments: _getAssessments,
            updateAssessments: _updateAssessments,
            deleteAssessment: ScheduleService.deleteAssessment
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('AssessmentsController', ['EventService', '$scope', 'ScheduleService', 'CacheService', AssessmentsController]);
})();