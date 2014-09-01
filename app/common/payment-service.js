/**
 * Created by Danny Schreiber on 8/31/14.
 */

(function(){
    'use strict';

    var PaymentService = function($q){

        var _getPayments = function(){

        };

        return {
            getPayments: _getPayments
        };
    };

    ramAngularApp.module.factory('PaymentService', ['$q', PaymentService]);
})();