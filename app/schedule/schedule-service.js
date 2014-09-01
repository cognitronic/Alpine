/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';

    var ScheduleService = function($q, AssessmentService){

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
        }

        var _addAssessment = function(){

        };

        return {
            getCropYears: _getCropYears,
            getAssessments: AssessmentService.getAssessments,
            deleteAssessment: AssessmentService.deleteAssessment,
            addAssessment: _addAssessment,
            updateAssessments: AssessmentService.updateAssessments
        }
    };

    ramAngularApp.module.factory('ScheduleService', ['$q', 'AssessmentService', ScheduleService]);
})();