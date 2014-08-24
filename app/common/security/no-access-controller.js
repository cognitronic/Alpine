/**
 * Created by Danny Schreiber on 8/24/14.
 */

(function(){
    'use strict';

    var NoAccessController = function($scope){

        var _message = '';

        $scope.model = {
            message: _message
        };
    };

    angular.module('alpine').controller('NoAccessController', ['$scope', NoAccessController]);
})();