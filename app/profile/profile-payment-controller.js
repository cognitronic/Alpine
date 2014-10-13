/**
 * Created by Danny Schreiber on 10/12/2014.
 */

(function(){
    'use strict';

    var ProfilePaymentController = function($scope, CacheService, GrowerService){

        var _growerPayments = [];
        var _selectedGrowerPayment = {};

        var _loadPayments = function(){
            GrowerService.getGrowerPayments(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id, CacheService.getItem(CacheService.Items.SelectedCropYear)).then(function(data){
                $scope.model.growerPayments = data;
            });
        };

        var _init = function(){
            $scope.model.loadPayments();
        };
        $scope.model = {
            init: _init,
            growerPayments: _growerPayments,
            selectedGrowerPayment: _selectedGrowerPayment,
            loadPayments: _loadPayments
        };
        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfilePaymentController', ['$scope', 'CacheService', 'GrowerService', ProfilePaymentController]);
})();