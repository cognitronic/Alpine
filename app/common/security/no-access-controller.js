/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var NoAccessController = function($scope, Constants){

        var _message = '';

        $scope.model = {
            message: _message
        };
    };

    ramAngularApp.module.controller('NoAccessController', ['$scope', 'Constants', NoAccessController]);
})();