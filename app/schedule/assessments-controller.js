/**
 * Created by Danny Schreiber on 8/31/14.
 */
(function(){
    'use strict';
    var AssessmentsController = function(EventService, $scope, ScheduleService, CacheService){
        var _assessments = [];
        var _assessment = {
            name: '',
            price: 0,
            cropYear: ''

        }

        var _getAssessments = function(){
            ScheduleService.getAssessments(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                $scope.model.assessments = data;
            });
        };

        var _updateAssessments = function(){
            for(var i = 0, l = $scope.model.assessments.length; i<l; i++){
                ScheduleService.updateAssessments($scope.model.assessments[i]);
            }
        };

        var _saveAssessment = function(){
            $scope.model.assessment.cropYear = CacheService.getItem(CacheService.Items.SelectedCropYear);
            ScheduleService.saveAssessment($scope.model.assessment).then(function(data){
                $scope.$close();
                $scope.model.assessments.push($scope.model.assessment);
            });
        };

        var _deleteAssessment = function(assessment){
            ScheduleService.deleteAssessment(assessment).then(function(data){
                $scope.model.init();
            });
        };

        var _init = function(){
            $scope.model.getAssessments();
        };

        var cropYearChangeListener = EventService.sub('CropYearChanged',function(message){
            $scope.model.init();
        });
        $scope.$on('$destroy', cropYearChangeListener);

        $scope.model = {
            init: _init,
            assessments: _assessments,
            assessment: _assessment,
            getAssessments: _getAssessments,
            updateAssessments: _updateAssessments,
            saveAssessment: _saveAssessment,
            deleteAssessment: _deleteAssessment
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('AssessmentsController', ['EventService', '$scope', 'ScheduleService', 'CacheService', AssessmentsController]);
})();