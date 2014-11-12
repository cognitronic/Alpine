/**
 * Created by Danny Schreiber on 10/12/2014.
 */

(function(){
    'use strict';

    var ProfilePaymentController = function($scope, CacheService, GrowerService, EventService, $window, RestService){

        var _growerPayments = [];
        var _selectedGrowerPayment = {};

        var _loadPayments = function(){
            if(CacheService.getItem(CacheService.Items.Profile.selectedGrower) && CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id) {
                GrowerService.getGrowerPayments(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id, CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function (data) {
                    $scope.model.growerPayments = data;
                });
            }
        };

        var _deletePayment = function(payment){
            GrowerService.deleteGrowerPayment(payment).then(function(data){
                $scope.model.loadPayments();
            });
        };

        var _viewPaymentReport = function(payment){
            $window.open(RestService.BASE_REPORTS_URL + 'progressreport?gid=' +
            CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id +
            '&cy=' + CacheService.getItem(CacheService.Items.SelectedCropYear) +
            '&pt=' + payment.paymentType);
        };

        var _init = function(){
            $scope.model.loadPayments();
        };
        $scope.model = {
            init: _init,
            growerPayments: _growerPayments,
            selectedGrowerPayment: _selectedGrowerPayment,
            loadPayments: _loadPayments,
            deletePayment: _deletePayment,
            viewPaymentReport: _viewPaymentReport
        };
        $scope.model.init();

        EventService.sub($scope, 'PaymentTransaction', function(message){
            $scope.model.loadPayments();
        });
        EventService.sub($scope, 'SelectedProfileChanged',function(message){
            $scope.model.init();
        });
    };

    ramAngularApp.module.controller('ProfilePaymentController', ['$scope', 'CacheService', 'GrowerService', 'EventService', '$window', 'RestService', ProfilePaymentController]);
})();