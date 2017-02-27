/**
 * Created by Danny Schreiber on 4/23/14.
 */

angular.module('dialogs.service',['ui.bootstrap.modal','dialogs.controllers'])

/**
 * Dialogs Service
 */
    .provider('DialogsService',[function(){
        var b = true; // backdrop
        var k = true; // keyboard
        var w = 'dialogs-default'; // windowClass
        var copy = true; // controls use of angular.copy

        /**
         * Use Backdrop
         *
         * Sets the use of the modal backdrop.  Either to have one or not and
         * whether or not it responds to mouse clicks ('static' sets the
         * backdrop to true and does not respond to mouse clicks).
         *
         * @param	val 	mixed	(true, false, 'static')
         */
        this.useBackdrop = function(val){ // possible values : true, false, 'static'
            if(angular.isDefined(val))
                b = val;
        }; // end useStaticBackdrop

        /**
         * Use ESC Close
         *
         * Sets the use of the ESC (escape) key to close modal windows.
         *
         * @param	val 	boolean
         */
        this.useEscClose = function(val){ // possible values : true, false
            if(angular.isDefined(val))
                k = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
        }; // end useESCClose

        /**
         * Use Class
         *
         * Sets the additional CSS window class of the modal window template.
         *
         * @param	val 	string
         */
        this.useClass = function(val){
            if(angular.isDefined(val))
                w = val;
        }; // end useClass

        /**
         * Use Copy
         *
         * Determines the use of angular.copy when sending data to the modal controller.
         *
         * @param	val 	boolean
         */
        this.useCopy = function(val){
            if(angular.isDefined(val))
                copy = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
        }; // end useCopy

        this.$get = ['$modal',function ($modal){
            return {
                error : function(header,msg){
                    return $modal.open({
                        templateUrl : '/common/dialog-error.html',
                        controller : 'errorDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve : {
                            header : function() { return angular.copy(header); },
                            msg : function() { return angular.copy(msg); }
                        }
                    }); // end modal.open
                }, // end error

                wait : function(header,msg,progress){
                    return $modal.open({
                        templateUrl : '/dialogs/wait.html',
                        controller : 'waitDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve : {
                            header : function() { return angular.copy(header); },
                            msg : function() { return angular.copy(msg); },
                            progress : function() { return angular.copy(progress); }
                        }
                    }); // end modal.open
                }, // end wait

                notify : function(header,msg){
                    return $modal.open({
                        templateUrl : '/common/dialog-notify.html',
                        controller : 'notifyDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve : {
                            header : function() { return angular.copy(header); },
                            msg : function() { return angular.copy(msg); }
                        }
                    }); // end modal.open
                }, // end notify

                confirm : function(header,msg){
                    return $modal.open({
                        templateUrl : '/common/dialog-confirm.html',
                        controller : 'confirmDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve : {
                            header : function() { return angular.copy(header); },
                            msg : function() { return angular.copy(msg); }
                        }
                    }); // end modal.open
                }, // end confirm

                create : function(url,ctrlr,data){
                    return $modal.open({
                        templateUrl : url,
                        controller : ctrlr,
                        keyboard : k,
                        backdrop : b,
                        windowClass: w,
                        resolve : {
                            modalResolveData : function() {
                                if(copy){
                                    console.log('copy is true');
                                    return angular.copy(data);
                                }
                                else
                                    return data;
                            }
                        }
                    }); // end modal.open
                } // end create
            }; // end return
        }]; // end $get
    }]);

angular.module("dialogs.service").value("defaultStrings",{
    error: "Error",
    errorMessage: "An unknown error has occurred.",
    close: "Close",
    pleaseWait: "Please Wait",
    pleaseWaitEllipsis: "Please Wait...",
    pleaseWaitMessage: "Waiting on operation to complete.",
    percentComplete: "% Complete",
    notification: "Notification",
    notificationMessage: "Unknown application notification.",
    confirmation: "Confirmation",
    confirmationMessage: "Confirmation required.",
    ok: "OK",
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    saveReturn: "Save and Return"
});