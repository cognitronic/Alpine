/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfileScheduleController = function($scope, ScheduleService, CacheService, EventService){

        var _paymentSchedules = [];
        var _selectedSchedule = {};
        var _isOpen = false;
        var _showSchedule = false;

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

        var _init = function(){
            $scope.model.loadPaymentSchedules();
            if($scope.model.selectedSchedule && $scope.model.selectedSchedule.name === undefined){
                $scope.model.selectedSchedule.name = 'Select A Payment Schedule';
            }
        };

        $scope.model = {
            init: _init,
            paymentSchedules: _paymentSchedules,
            isOpen: _isOpen,
            loadPaymentSchedules: _loadPaymentSchedules,
            toggleDropdown: _toggleDropdown,
            selectedSchedule: _selectedSchedule,
            scheduleSelected: _scheduleSelected,
            showSchedule: _showSchedule
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfileScheduleController', ['$scope', 'ScheduleService', 'CacheService', 'EventService', ProfileScheduleController]);
})();