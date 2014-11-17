/**
 * Created by Danny Schreiber on 9/16/14.
 */

(function(){
    'use strict';

    var ProfilePayeesModalController = function($scope, CacheService, GrowerService, EventService){

        var _selectedPayee = {};
        var _payee = {};
        var _payees = [];

        var _init = function(){
            //$scope.model.loadPayees();
        };

        //var _loadPayees = function(){
        //    if(CacheService.getItem(CacheService.Items.Profile.selectedGrower) && CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id){
        //        GrowerService.getGrowerPayees(CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id).then(function(data){
        //            $scope.model.payees = data;
        //        });
        //    }
        //};

        //var _updatePayees = function(){
        //    for(var i = 0, l = $scope.model.payees.length; i < l; i++){
        //        $scope.model.payees[i].sid =$scope.model.payees[i].Id.toString();
        //        $scope.model.payees[i].growerId = CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id;
        //        GrowerService.updatePayee($scope.model.payees[i]).then(function(data){
        //
        //        });
        //    }
        //};

        var _savePayee = function(){
            $scope.model.payee.growerId = CacheService.getItem(CacheService.Items.Profile.selectedGrower).Id;
            GrowerService.savePayee($scope.model.payee).then(function(data){
                $scope.$dismiss();
                EventService.pub('payeeSaved', {});
            });
        };

        //var _deletePayee = function(payee){
        //    GrowerService.deletePayee(payee).then(function(data){
        //        $scope.model.init();
        //    });
        //};

        $scope.model = {
            init: _init,
            payee: _payee,
            savePayee: _savePayee
        }
        //EventService.sub($scope, 'SelectedProfileChanged',function(message){
        //    $scope.model.init();
        //});
        $scope.model.init();
    };

    ramAngularApp.module.controller('ProfilePayeesModalController', ['$scope', 'CacheService', 'GrowerService', 'EventService', ProfilePayeesModalController]);
})();