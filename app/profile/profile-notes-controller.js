/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileNotesController = function($scope, GrowerService, CacheService, EventService, UtilityService){

        var _notes = [];
        var _note = {};

        var _updateNotes = function(){

        };

        var _saveNote = function(){
            $scope.model.note.growerId = CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id;
            $scope.model.note.isActive = true;
            $scope.model.note.dateCreated = UtilityService.formatDateNoTime(new Date());
            GrowerService.saveGrowerNote($scope.model.note).then(function(data){
                $scope.$close();
                $scope.model.notes.push($scope.model.note);
            });
        };

        var _deleteNote = function(note){
            GrowerService.deleteGrowerNote(note).then(function(data){
               $scope.model.loadNotes();
            });
        };

        var _updateNotes = function(){
            for(var i = 0, l = $scope.model.notes.length; i < l; i++){
                GrowerService.updateGrowerNotes($scope.model.notes[i]);
            }
        };

        var _loadNotes = function(){
            $scope.model.notes = [];
            if(CacheService.getItem(CacheService.Items.Profile.selectedGrower) && CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id){
                GrowerService.getGrowerNotes(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id)
                    .then(function(data){
                        $scope.model.notes = data;
                    });
            }
        };

        var _formatDate = function(datestring){
          return UtilityService.formatPaddedDateNoTime(new Date(datestring));
        };

        var _init = function(){
            $scope.model.loadNotes();
        };

        $scope.model = {
            init: _init,
            updateNotes: _updateNotes,
            deleteNote: _deleteNote,
            loadNotes: _loadNotes,
            saveNote: _saveNote,
            notes: _notes,
            note: _note,
            formatDate: _formatDate
        };
        EventService.sub($scope, 'SelectedProfileChanged',function(message){
            $scope.model.init();
        });

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileNotesController', ['$scope', 'GrowerService', 'CacheService', 'EventService', 'UtilityService', ProfileNotesController]);
})();