/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';
    var PaymentSchedulesController = function($scope, ScheduleService, EventService, CacheService){

        var _progressPaymentOneDate = new Date();
        var __progressPaymentOneOpened = false;
        var _paymentSchedules = [];
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
        var _isNew = false;

        var _paymentSchedule = {};

        var _init = function(){
            $scope.model.getPaymentSchedules();
            if($scope.model.paymentSchedules.length < 1){
                $scope.model.isNew = true;
            } else {
                $scope.model.isNew = false;
            }
        };

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

        var _getPaymentSchedules = function(){
            ScheduleService.getPaymentSchedules(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                $scope.model.paymentSchedules = data;
            });
        };

        var _updatePaymentSchedule = function(schedule){
            console.log(schedule);
            ScheduleService.updatePaymentSchedule(schedule.Id, schedule).then(function(data){
               $scope.model.init();
            });
        };

        var _savePaymentSchedule = function(){
            ScheduleService.savePaymentSchedule(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
               $scope.model.paymentSchedules = data;
            });
        }

        EventService.sub($scope, 'CropYearChanged',function(message){
            $scope.model.init();
        });




        $scope.model = {
            init: _init,
            progressPaymentOneDate: _progressPaymentOneDate,
            progressPaymentOneOpened: __progressPaymentOneOpened,
            getPaymentSchedules: _getPaymentSchedules,
            paymentSchedules: _paymentSchedules,
            openDatePicker: _openDatePicker,
            toggleDatePickers: _toggleDatePickers,
            toggleMinDate: _toggleMinDate,
            toggleMaxDate: _toggleMaxDate,
            datePickerButtons: _datePickerButtons,
            updatePaymentSchedule: _updatePaymentSchedule,
            paymentSchedule: _paymentSchedule,
            isNew: _isNew,
            savePaymentSchedule: _savePaymentSchedule
        };

        $scope.model.init();
    };

    ramAngularApp.module.controller('PaymentSchedulesController', ['$scope', 'ScheduleService', 'EventService', 'CacheService', PaymentSchedulesController]);
})();