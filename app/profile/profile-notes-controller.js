/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileNotesController = function($scope, GrowerService, CacheService, EventService){

        var _notes = [];

        var _updateNotes = function(){

        };

        var _deleteNote = function(note){

        };

        var _loadNotes = function(){
            GrowerService.getGrowerNotes(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id)
                .then(function(data){
                   $scope.model.notes = data;
                });
        };

        var _init = function(){
            $scope.model.loadNotes();
        };

        $scope.model = {
            init: _init,
            updateNotes: _updateNotes,
            deleteNote: _deleteNote,
            loadNotes: _loadNotes,
            notes: _notes
        }
        var cropYearChangeListener = EventService.sub('SelectedProfileChanged',function(message){
            $scope.model.init();
        });
        $scope.$on('$destroy', cropYearChangeListener);

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileNotesController', ['$scope', 'GrowerService', 'CacheService', 'EventService', ProfileNotesController]);
})();