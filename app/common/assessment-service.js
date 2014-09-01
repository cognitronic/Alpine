/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';

    var AssessmentService = function($q, RestService, CacheService, Constants){

        var _getAssessments = function(cropyear){

            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.ASSESSMENTS + '?cropyear=' + cropyear, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_ASSESSMENTS_LOAD);
            return deferred.promise;
        };

        var _deleteAssessment = function(assessment){
            console.log(assessment);
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.deleteData(RestService.URLS.ASSESSMENTS + '/' +  assessment.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _updateAssessments = function(assessment){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.putData(RestService.URLS.ASSESSMENTS + '/' + assessment.Id, assessment, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        return {
            getAssessments: _getAssessments,
            deleteAssessment: _deleteAssessment,
            updateAssessments: _updateAssessments
        };
    };

    ramAngularApp.module.factory('AssessmentService', ['$q', 'RestService', 'CacheService', 'Constants', AssessmentService]);
})();