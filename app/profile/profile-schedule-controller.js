/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileScheduleController = function($scope, $q, ScheduleService, CacheService, EventService, GrowerService){

        var _paymentSchedules = [];
        var _selectedSchedule = {};
        var _isOpen = false;
        var _showSchedule = false;
        var _scheduleAssigned = false;
        var _progressPaymentOneDate = new Date();
        var _progressPaymentOneOpened = false;
        var _datePickerButtons = ['progressPaymentDate_ScheduleOne_1',
            'progressPaymentDate_ScheduleOne_2',
            'progressPaymentDate_ScheduleOne_3',
            'progressPaymentDate_ScheduleOne_4',
            'progressPaymentDate_ScheduleTwo_1',
            'progressPaymentDate_ScheduleTwo_2',
            'progressPaymentDate_ScheduleTwo_3',
            'progressPaymentDate_ScheduleTwo_4',
            'progressPaymentDate_ScheduleThree_1',
            'progressPaymentDate_ScheduleThree_2',
            'progressPaymentDate_ScheduleThree_3',
            'progressPaymentDate_ScheduleThree_4'
        ];

        var _loadPaymentSchedules = function(){
            ScheduleService.getPaymentSchedules(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
               $scope.model.paymentSchedules = data;
            });
        };

        var _toggleDropdown = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.model.isOpen = !$scope.model.isOpen;
        };

        var _scheduleSelected = function(schedule){
            $scope.model.selectedSchedule = schedule;
            CacheService.setItem(CacheService.Items.Profile.selectedSchedule, schedule);
            $scope.model.showSchedule = true;
        };

        var _loadGrowerPaymentSchedule = function(){
            var deferred = $q.defer();
            $scope.model.selectedSchedule = {};
            GrowerService.getGrowerSchedule(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id, CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
               if(data && data.length > 0){
                   console.log(data);
                   $scope.model.selectedSchedule = data[0];
                   CacheService.setItem(CacheService.Items.Profile.selectedSchedule, data[0]);
                   $scope.model.showSchedule = true;
                   $scope.model.scheduleAssigned = true;
               } else {
                   $scope.model.showSchedule = false;
                   $scope.model.scheduleAssigned = false;
               }
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        var _updateGrowerPaymentSchedule = function(schedule){
            if($scope.model.scheduleAssigned){
                GrowerService.updateGrowerSchedule(schedule).then(function(data){
                    $scope.model.showSchedule = true;
                    $scope.model.scheduleAssigned = true;
                });
            } else {
                var newSchedule = angular.copy(schedule);
                newSchedule.Id = '-1'
                newSchedule.growerId = CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id;
                newSchedule.cropYear = CacheService.getItem(CacheService.Items.SelectedCropYear);
                GrowerService.updateGrowerSchedule(newSchedule).then(function(data){
                    $scope.model.showSchedule = true;
                    $scope.model.scheduleAssigned = true;
                });
            }
        }

        //Sets the directive's max variable to today if a date string is not passed in.
        var _toggleMaxDate = function() {
            $scope.model.maxDate = ( $scope.model.maxDate ) ? null : new Date();
        };

        //Sets the directive's min variable to today if a date string is not passed in
        var _toggleMinDate = function() {
            $scope.model.minDate = ( $scope.model.minDate ) ? null : new Date();
        };

        //Iterates through the datePickerButtons array above to see which picker was clicked, and makes sure
        // only the current picker popup is set to true
        var _toggleDatePickers = function(pickerButton){
            for(var i = 0, len = $scope.model.datePickerButtons.length; i < len; i++){
                if(pickerButton === $scope.model.datePickerButtons[i])
                    $scope.model[pickerButton] = true;
                else
                    $scope[$scope.model.datePickerButtons[i].replace('Popup', 'Opened')] = false;
            }
        };

        //Grabs the event object's id and passes that into the toggleDatePicker function
        var _openDatePicker = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = ($event.currentTarget) ? $event.currentTarget: $event.srcElement;
            $scope.model.toggleDatePickers(target.id);
        };

        var _init = function(){
            $scope.model.loadGrowerPaymentSchedule().then(function(data){
                if(!$scope.model.scheduleAssigned){
                    $scope.model.loadPaymentSchedules();
                    if($scope.model.selectedSchedule && $scope.model.selectedSchedule.name === undefined){
                        $scope.model.selectedSchedule.name = 'Select A Payment Schedule';
                    }
                }
            });
        };

        $scope.model = {
            init: _init,
            paymentSchedules: _paymentSchedules,
            isOpen: _isOpen,
            loadPaymentSchedules: _loadPaymentSchedules,
            toggleDropdown: _toggleDropdown,
            selectedSchedule: _selectedSchedule,
            scheduleSelected: _scheduleSelected,
            showSchedule: _showSchedule,
            scheduleAssigned: _scheduleAssigned,
            loadGrowerPaymentSchedule: _loadGrowerPaymentSchedule,
            updateGrowerPaymentSchedule: _updateGrowerPaymentSchedule,
            openDatePicker: _openDatePicker,
            toggleDatePickers: _toggleDatePickers,
            toggleMinDate: _toggleMinDate,
            toggleMaxDate: _toggleMaxDate,
            datePickerButtons: _datePickerButtons
        }
        EventService.sub($scope, 'SelectedProfileChanged',function(message){
            $scope.model.init();
        });
        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileScheduleController', ['$scope', '$q', 'ScheduleService', 'CacheService', 'EventService', 'GrowerService', ProfileScheduleController]);
})();