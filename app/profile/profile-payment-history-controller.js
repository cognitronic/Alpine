/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfilePaymentHistoryController = function($scope, CacheService, GrowerService, modalResolveData, EventService){
        var _selectedSchedule = {};
        var _selectedPayment = {};
        var _selectedProgressPayment = {};
        var _opened = false;
        var _isOpen = false;
        var _showProgressPayments = false;
        var _paymentTypes = [];
        var _paymentAmount = 0;
        var _paymentNote = '';
        var _selectedGrowerPayment = {};
        var _isReadOnly = true;

        var _init = function(){
            $scope.model.selectedSchedule = CacheService.getItem(CacheService.Items.Profile.selectedSchedule);
            _constructPaymentTypesSelect();

            //checks to see if editing, and if so finds the selected payment via the lookup
            if(modalResolveData.editingModel){
                $scope.model.selectedGrowerPayment = modalResolveData.editingModel;
                var lookup = {};
                for (var i = 0, len = $scope.model.paymentTypes.length; i < len; i++) {
                    lookup[$scope.model.paymentTypes[i].paymentType] = $scope.model.paymentTypes[i];
                }
                $scope.model.selectedPayment = lookup[modalResolveData.editingModel.paymentType];
                if($scope.model.selectedPayment.paymentType == 5){
                    $scope.model.showProgressPayments = true;
                    $scope.model.selectedProgressPayment.name = $scope.model.selectedSchedule.progressPayments[$scope.model.selectedGrowerPayment.applyToPaymentType -1].name;
                    $scope.model.isReadOnly = false;
                } else {
                    $scope.model.isReadOnly = true;
                }
            }
        };

        var _getProgressPaymentTypeByName = function(name){
            if(name === undefined){
                return 0;
            }
            var lookup = {};
            for(var i = 0, len = $scope.model.selectedSchedule.progressPayments.length; i < len; i++){
                lookup[$scope.model.selectedSchedule.progressPayments[i].name] =$scope.model.selectedSchedule.progressPayments[i];
            }

            return lookup[name].paymentType;
        }

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
                $scope.model.isReadOnly = false;
            } else {
                $scope.model.showProgressPayments = false;
                $scope.model.isReadOnly = true;
            }
        };

        var _progressPaymentSelected = function(payment){
          $scope.model.selectedProgressPayment = payment;
        };

        var _savePayment = function(){
            var payment = {};
            var amt = 0;
            if(modalResolveData.editingModel){
                if($scope.model.selectedGrowerPayment.amount){
                   amt = $scope.model.selectedGrowerPayment.amount;
                }
                payment = {
                    growerId: CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id,
                    cropYear: CacheService.getItem(CacheService.Items.SelectedCropYear),
                    paymentType: $scope.model.selectedPayment.paymentType,
                    paymentTypeName: $scope.model.selectedPayment.name,
                    amount: amt,
                    transactionDate: $scope.model.selectedGrowerPayment.transactionDate,
                    note: $scope.model.selectedGrowerPayment.note,
                    applyToPaymentType: _getProgressPaymentTypeByName($scope.model.selectedProgressPayment.name).paymentType,
                    Id: $scope.model.selectedGrowerPayment.Id
                };
            } else {
                if($scope.model.selectedGrowerPayment.amount){
                    amt = $scope.model.selectedGrowerPayment.amount;
                }
                payment = {
                    growerId: CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id,
                    cropYear: CacheService.getItem(CacheService.Items.SelectedCropYear),
                    paymentType: $scope.model.selectedPayment.paymentType,
                    paymentTypeName: $scope.model.selectedPayment.name,
                    amount: amt,
                    transactionDate: $scope.model.selectedGrowerPayment.transactionDate.toLocaleDateString(),
                    note: $scope.model.selectedGrowerPayment.note,
                    applyToPaymentType: _getProgressPaymentTypeByName($scope.model.selectedProgressPayment.name).paymentType
                };
            }

            GrowerService.saveGrowerPayment(payment).then(function(data){
               $scope.$dismiss();
                EventService.pub('PaymentTransaction', {});
            });
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
            open: _open,
            savePayment: _savePayment,
            paymentAmount: _paymentAmount,
            paymentNote: _paymentNote,
            isReadOnly: _isReadOnly,
            selectedGrowerPayment: _selectedGrowerPayment
        };

        $scope.model.init();


    };

    ramAngularApp.module.controller('ProfilePaymentHistoryController', ['$scope', 'CacheService', 'GrowerService', 'modalResolveData', 'EventService', ProfilePaymentHistoryController]);
})();