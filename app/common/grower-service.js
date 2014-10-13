/**
 * Created by Danny Schreiber on 9/17/14.
 */
(function(){

    'use strict';
    var GrowerService = function($q, RestService, Constants, CacheService){

        var _getGrowers = function(){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_GROWERS, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _getGrowerNotes = function(growerId){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GROWER_NOTES + growerId, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _saveGrowerNote = function(note){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.GROWER_NOTES, note, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _updateGrowerNotes = function(note){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.putData(RestService.URLS.GROWER_NOTES + '/' + note.Id, note, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _deleteGrowerNote = function(note){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.GROWER_NOTES + '/' + note.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _getGrowerAssessments = function(assessmentId, cropYear){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_GROWER_ASSESSMENTS + assessmentId + '/' + cropYear, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _deleteAssessment = function(assessment){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.GROWER_ASSESSMENTS + '/' + assessment.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _updateGrowerAssessment = function(assessment){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.GET_GROWER_ASSESSMENTS + '/' + CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id, assessment, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _deleteGrowerAssessment = function(assessment){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.GET_GROWER_ASSESSMENTS + '/' + assessment.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _getGrowerPayees = function(growerId){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GET_GROWER_PAYEES + growerId, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _getGrowerSchedule = function(growerId, cropYear){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GROWER_SCHEDULE + growerId + '/' + cropYear, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _updateGrowerSchedule = function(schedule){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.putData(RestService.URLS.GROWER_SCHEDULE + '/' + schedule.Id, schedule, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _saveGrowerPayment = function(payment){
          var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            if(payment.Id == undefined){
                payment.Id = '-1';
            }
            RestService.postData(RestService.URLS.GROWER_PAYMENT + payment.Id, payment, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _getGrowerPayments = function(growerId, cropYear){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };

            RestService.getData(RestService.URLS.GROWER_PAYMENT + growerId + '/' + cropYear, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _deleteGrowerPayment = function(payment){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.GROWER_PAYMENT + '/' + payment.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _updatePayees = function(payees){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.GROWER_PAYEES + 'update', payees, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _updatePayee = function(payee){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.putData(RestService.URLS.GROWER_PAYEES + payee.sid, payee, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _savePayee = function(payee){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.GROWER_PAYEES, payee, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _deletePayee = function(payee){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.GROWER_PAYEES + payee.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        return {
            getGrowers: _getGrowers,
            getGrowerNotes: _getGrowerNotes,
            saveGrowerNote: _saveGrowerNote,
            deleteGrowerNote: _deleteGrowerNote,
            updateGrowerNotes: _updateGrowerNotes,
            getGrowerAssessments: _getGrowerAssessments,
            deleteAssessment: _deleteAssessment,
            updateGrowerAssessment: _updateGrowerAssessment,
            deleteGrowerAssessment: _deleteGrowerAssessment,
            getGrowerPayees: _getGrowerPayees,
            getGrowerSchedule: _getGrowerSchedule,
            updateGrowerSchedule: _updateGrowerSchedule,
            saveGrowerPayment: _saveGrowerPayment,
            getGrowerPayments: _getGrowerPayments,
            deleteGrowerPayment: _deleteGrowerPayment,
            updatePayees: _updatePayees,
            updatePayee: _updatePayee,
            savePayee: _savePayee,
            deletePayee: _deletePayee
        }
    };

    ramAngularApp.module.factory('GrowerService', ['$q', 'RestService', 'Constants', 'CacheService', GrowerService]);
})();