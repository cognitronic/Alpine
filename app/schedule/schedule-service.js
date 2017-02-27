/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';

    var ScheduleService = function($q, RestService, AssessmentService, Constants){

        var _getCropYears = function(){
            var deferred = $q.defer();
            var cy = [];
            cy.push(new Date().getFullYear() + 1);
            cy.push(new Date().getFullYear());
            cy.push(new Date().getFullYear() - 1);
            cy.push(new Date().getFullYear() - 2);
            cy.push(new Date().getFullYear() - 3);
            cy.push(new Date().getFullYear() - 4);
            cy.push(new Date().getFullYear() - 5);

            deferred.resolve(cy);

            return deferred.promise;
        };

        var _getPaymentSchedules = function(cropYear){
            var deferred = $q.defer();
            var success = function(data){
                deferred.resolve(data);
            };
            RestService.getData(RestService.URLS.GET_PAYMENT_SCHEDULES + cropYear, success, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _updatePaymentSchedule = function(id, schedule){
            var deferred = $q.defer();
            var success = function(data){
                deferred.resolve(data);
            };
            RestService.putData(RestService.URLS.PUT_PAYMENT_SCHEDULES + id, schedule, success, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _savePaymentSchedule = function(cropYear){
          var deferred = $q.defer();
            var success = function(data){
              deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.PUT_PAYMENT_SCHEDULES + cropYear, cropYear, success, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        return {
            getCropYears: _getCropYears,
            getAssessments: AssessmentService.getAssessments,
            deleteAssessment: AssessmentService.deleteAssessment,
            updateAssessments: AssessmentService.updateAssessments,
            saveAssessment: AssessmentService.saveAssessment,
            getPaymentSchedules: _getPaymentSchedules,
            updatePaymentSchedule: _updatePaymentSchedule,
            savePaymentSchedule: _savePaymentSchedule
        }
    };

    ramAngularApp.module.factory('ScheduleService', ['$q', 'RestService', 'AssessmentService', 'Constants', ScheduleService]);
})();