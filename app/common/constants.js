/**
 * Created by Danny Schreiber on 8/23/14.
 */

'use strict';

ramAngularApp.module.constant('Constants', {

    ALERT_TYPE: {
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        SUCCESS: 'success'
    },
    MESSAGES: {
        ERROR: {
            FAILED_LOGIN_ATTEMPT: 'Invalid username or password, please try again.',
            FAILED_ASSESSMENTS_LOAD: 'Failed to load assessments.',
            FAILED_SAVE_RECORD: 'The save operation failed',
            FAILED_DELETE_RECORD: 'The delete operation failed',
            FAILED_LOAD_RECORD: 'The record load operation failed'
        },
        SUCCESS: {

        },
        WARNING: {

        },
        INFO: {

        }
    }
});
