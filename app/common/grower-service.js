/**
 * Created by Danny Schreiber on 9/17/14.
 */
(function(){

    'use strict';
    var GrowerService = function($q, RestService, Constants){

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

            RestService.getData(RestService.URLS.GET_GROWER_NOTES + growerId, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_LOAD_RECORD);
            return deferred.promise;
        };

        var _saveGrowerNote = function(note){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.postData(RestService.URLS.POST_GROWER_NOTE, note, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_SAVE_RECORD);
            return deferred.promise;
        };

        var _deleteGrowerNote = function(note){
            var deferred = $q.defer();
            var successCb = function(data){
                deferred.resolve(data);
            };
            RestService.deleteData(RestService.URLS.DELETE_GROWER_NOTE + '/' + note.Id, successCb, undefined, Constants.MESSAGES.ERROR.FAILED_DELETE_RECORD);
            return deferred.promise;
        };

        var _updateGrowerNotes = function(notes){

        };

        return {
            getGrowers: _getGrowers,
            getGrowerNotes: _getGrowerNotes,
            saveGrowerNote: _saveGrowerNote,
            deleteGrowerNote: _deleteGrowerNote
        }
    };

    ramAngularApp.module.factory('GrowerService', ['$q', 'RestService', 'Constants', GrowerService]);
})();