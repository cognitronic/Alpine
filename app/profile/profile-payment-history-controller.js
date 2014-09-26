/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfilePaymentHistoryController = function($scope, CacheService){
        var _selectedSchedule = {};
        var _selectedPayment = {};
        var _selectedProgressPayment = {};
        var _opened = false;
        var _isOpen = false;
        var _showProgressPayments = false;
        var _paymentTypes = [];

        var _init = function(){
            $scope.model.selectedSchedule = CacheService.getItem(CacheService.Items.Profile.selectedSchedule);
            _constructPaymentTypesSelect();
        };

        var _constructPaymentTypesSelect = function(){
          for(var i = 0, l = $scope.model.selectedSchedule.progressPayments.length; i < l; i++){
              var type = $scope.model.selectedSchedule.progressPayments[i];
              $scope.model.paymentTypes.push({'name': type.name, 'paymentType': type.paymentType});
          }
            $scope.model.paymentTypes.push({'name': 'Misc Payment', 'paymentType': 5});
            if($scope.model.selectedPayment && $scope.model.selectedPayment.name === undefined){
                $scope.model.selectedPayment.name = ' Select A Payment Type ';
            }
        };

        var _open = function($event){
            $event.preventDefault();
            $event.stopPropagation();

            $scope.model.opened = true;
        };

        var _paymentTypeSelected = function(payment){
            $scope.model.selectedPayment = payment;
            if(payment.paymentType == 5){
                $scope.model.showProgressPayments = true;
                $scope.model.selectedProgressPayment.name = ' Select A Payment ';
            } else {
                $scope.model.showProgressPayments = false;
            }
        };

        var _progressPaymentSelected = function(payment){
          $scope.model.selectedProgressPayment = payment;
        };

        $scope.model = {
            init: _init,
            selectedSchedule: _selectedSchedule,
            selectedPayment: _selectedPayment,
            isOpen: _isOpen,
            paymentTypes: _paymentTypes,
            paymentTypeSelected: _paymentTypeSelected,
            selectedProgressPayment: _selectedProgressPayment,
            opened: _opened,
            showProgressPayments: _showProgressPayments,
            progressPaymentSelected: _progressPaymentSelected,
            open: _open
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfilePaymentHistoryController', ['$scope', 'CacheService', ProfilePaymentHistoryController]);
})();