/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfilePayeesController = function($scope, CacheService, GrowerService){

        var _selectedPayee = {};
        var _payees = [];
        var _init = function(){
            $scope.model.loadPayees();
        };

        var _loadPayees = function(){
            GrowerService.getGrowerPayees(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id).then(function(data){
                $scope.model.payees = data;
            });
        };

        $scope.model = {
            init: _init,
            loadPayees: _loadPayees,
            selectedPayee: _selectedPayee,
            payees: _payees
        }

        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfilePayeesController', ['$scope', 'CacheService', 'GrowerService', ProfilePayeesController]);
})();