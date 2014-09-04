/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';
    var PaymentSchedulesController = function($scope, ScheduleService, EventService, CacheService){

        var _progressPaymentOneDate = new Date();
        var __progressPaymentOneOpened = false;
        var _paymentSchedules = [];

        var _init = function(){
            $scope.model.getPaymentSchedules();
        };

        var _progressPaymentOneDisabledDates = function(date, mode){
          return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        var _progressPaymentOneOpen = function($event){
            $event.preventDefault();
            $event.stopPropagation();

            $scope.model.progressPaymentOneOpened = true;
        };

        var _getPaymentSchedules = function(){
            ScheduleService.getPaymentSchedules(CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                $scope.model.paymentSchedules = data;
            });
        }

        var cropYearChangeListener = EventService.sub('CropYearChanged',function(message){
            $scope.model.init();
        });
        $scope.$on('$destroy', cropYearChangeListener);

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];


        $scope.model = {
            init: _init,
            progressPaymentOneDate: _progressPaymentOneDate,
            progressPaymentOneOpened: __progressPaymentOneOpened,
            progressPaymentOneDisabledDates: _progressPaymentOneDisabledDates,
            progressPaymentOneOpen: _progressPaymentOneOpen,
            getPaymentSchedules: _getPaymentSchedules,
            paymentSchedules: _paymentSchedules
        };

        $scope.model.init();
    };

    ramAngularApp.module.controller('PaymentSchedulesController', ['$scope', 'ScheduleService', 'EventService', 'CacheService', PaymentSchedulesController]);
})();