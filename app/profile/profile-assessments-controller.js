/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileAssessmentsController = function($scope, GrowerService, AssessmentService, CacheService, EventService, UtilityService){

        var _assessments = [];
        var _availableAssessments = [];
        var _init = function(){
            $scope.model.assessments = [];
            $scope.model.getAssessments();
            $scope.model.getAvailableAssessments();
        };

        var _getAssessments = function(){
            if(CacheService.getItem(CacheService.Items.Profile.selectedGrower) && CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id){
                GrowerService.getGrowerAssessments(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id, CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                    $scope.model.assessments = data;
                });
            }
        };

        var _getAvailableAssessments = function(){
            AssessmentService.getAssessments(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                console.log(data);
                $scope.model.availableAssessments = data;
          });
        };

        //var _saveAssessments = function(){
        //    for(var i = 0, l = $scope.model.availableAssessments.length; i < l; i++){
        //        $scope.model.availableAssessments[i].sid = $scope.model.availableAssessments[i].Id;
        //        console.log($scope.model.availableAssessments[i]);
        //        if($scope.model.availableAssessments[i].checked){
        //            GrowerService.updateGrowerAssessment($scope.model.availableAssessments[i]);
        //            _assessments.push($scope.model.availableAssessments[i]);
        //        }
        //    }
        //    $scope.$close();
        //    //$scope.model.init();
        //};

        var _deleteAssessment = function(assessment){
            GrowerService.deleteGrowerAssessment(assessment).then(function(){
               $scope.model.init();
            });
        };

        $scope.model = {
            init: _init,
            assessments: _assessments,
            getAssessments: _getAssessments,
            deleteAssessment: _deleteAssessment,
            availableAssessments: _availableAssessments,
            getAvailableAssessments: _getAvailableAssessments
            //saveAssessments: _saveAssessments
        };

        EventService.sub($scope, 'SelectedProfileChanged',function(message){
            $scope.model.init();
        });
        EventService.sub($scope, 'assessmentSaved', function(message){
            $scope.model.init();
        });

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileAssessmentsController', ['$scope', 'GrowerService', 'AssessmentService', 'CacheService', 'EventService', 'UtilityService', ProfileAssessmentsController]);
})();