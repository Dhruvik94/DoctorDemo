"use strict";

/**
 * Configuration file where you can store error codes for responses
 *
 * It's just a storage where you can define your custom API errors and their description.
 * You can call then in your action res.ok(data, sails.config.errors.USER_NOT_FOUND);
 */

module.exports = {
    errors: {
        BAD_REQUEST: {
            code: 'E_BAD_REQUEST',
            message: 'The request cannot be fulfilled due to bad syntax',
            status: 400
        },

        CREATED: {
            code: 'CREATED',
            message: 'The request has been fulfilled and resulted in a new resource being created',
            status: 201
        },

        FORBIDDEN: {
            code: 'E_FORBIDDEN',
            message: 'User not authorized to perform the operation',
            status: 403
        },

        TIMEMISSMATCH: {
            code: 'E_FORBIDDEN',
            message: ' Appointment time and CallBack time Mismatch Please Select Valid Call_back time.',
            status: 403
        },

        NOT_FOUND: {
            code: 'E_NOT_FOUND',
            message: 'The requested resource could not be found but may be available again in the future',
            status: 404
        },

        OK: {
            response_code: "E_SUCCESS",
            message: 'Operation is successfully executed',
            status: 200
        },
        VERIFICATION_ALREADY_DONE: {
            response_code: "E_SUCCESS",
            message: 'Verification is already completed',
            status: 200
        },
        LOGIN_DONE: {
            response_code: "E_SUCCESS",
            message: 'Operation is successfully executed',
            status: 200
        },
        OTP_SEND: {
            response_code: "E_SUCCESS",
            message: 'OTP is successfully send',
            status: 200
        },
        SERVER_ERROR: {
            response_code: "E_INTERNAL_ERROR",
            code: 'E_INTERNAL_SERVER_ERROR',
            message: 'Something bad happened on the server',
            status: 500
        },

        PIN_POLICY_ERROR: {
            response_code: "E_INTERNAL_ERROR",
            code: 'E_INTERNAL_SERVER_ERROR',
            message: 'Pinpolicy is not defined',
            status: 500
        },

        UNAUTHORIZED: {
            code: 'E_UNAUTHORIZED',
            message: 'Missing or invalid authentication token',
            status: 401
        },

        VERIFICATION_SUCCESS: {
            response_code: "E_VERIFICATION_DONE",
            message: 'Congratulation, you verified successfully.',
            status: 200
        },

        VERIFICATION_FAILURE: {
            response_code: "E_VERIFICATION_FAILED",
            message: 'Please Enter valid OTP.',
            status: 203
        },

        INVALID_CREDENTIAL: {
            response_code: "E_INVALID_CRENDENTIAL",
            message: 'Credentials is not valid.',
            status: 203
        },
        INVALID_VERIFICATION_CODE: {
            response_code: "E_INVALID_CRENDENTIAL",
            message: 'Verification code is not valid.',
            status: 203
        },
        EMAIL_SEND_SUCCESS: {
            response_code: "E_EMAIL_SENT",
            message: 'Send Verification code to your email id.',
            status: 200
        },

        FORGOT_EMAIL_SEND_SUCCESS: {
            response_code: "E_FORGOT_DONE",
            message: 'Check your mail, New password sent to your Email Address',
            status: 200
        },

        FORGOT_EMAIL_SEND_FAILURE: {
            response_code: "E_FORGOT_FAILED",
            message: 'No user with this email address.',
            status: 200
        },

        DATA_FOUND: {
            response_code: "E_DATA",
            message: 'Data retreived successfully.',
            status: 200
        },

        SET_PIN_POLICY: {
            response_code: "E_VERIFICATION_DONE",
            message: 'There is no pin policy for current Organization. Please contact Admin to set pin policy',
            status: 401
        },

        DB_QUERY_ERROR: {
            response_code: "E_DB_ERROR",
            message: 'Internal server error',
            status: 203
        },

        MANDATORY_FIELDS: {
            response_code: "E_MANDATORY_FILED",
            message: 'Please provide all mandatory values.',
            status: 204
        },

        MANDATORY_FOLLOW_STEPS: {
            response_code: "E_MANDATORY_STEPS",
            message: 'Please follow all steps.',
            status: 204

        },

        PARAMETER_OR_VALUE_NOT_FOUND: {
            response_code: "E_NOT_FOUND",
            message: 'Parameter or value missing',
            status: 205
        },

        DATA_NOT_FOUND: {
            response_code: "E_DATA_NOT_GET",
            message: 'No Data Found.',
            status: 205
        },

        WENT_WRONG: {
            response_code: "E_SOMETHING_WRONG",
            message: 'Something went wrong,please try again later.',
            status: 500
        },

        WENT_WRONG_MAIL: {
            response_code: "E_MAIL_FAIL",
            message: 'Something went wrong to send mail,please try again later.',
            status: 300
        },

        ERROR_UPLOAD_PICTURE: {
            response_code: "E_PICTURE_FAIL",
            message: 'Error occured in uploading profile picture, please try again later.',
            status: 301
        },

        EMAIL_ID_ALREADY_EXITS: {
            response_code: "E_DUBLICATE_EMAIL",
            message: 'Email Id already exist.',
            status: 402
        },

        DOMAIN_ID_ALREADY_EXITS: {
            response_code: "E_DUBLICATE_Domain",
            message: 'Domain already exist.',
            status: 402
        },

        EMAIL_ID_USERNAME_ALREADY_EXITS: {
            response_code: "E_DUBLICATE_EMAIL_USERNAME",
            message: 'Email or Username already exist.',
            status: 402
        },

        USERNAME_ALREADY_EXITS: {
            response_code: "E_DEBLICATE_USERNAME",
            message: 'Username already exist.',
            status: 402
        },

        USER_NOT_FOUND: {
            response_code: "E_USER_NOT_FOUND",
            message: 'Username you entered is not available.',
            status: 404
        },

        USER_BLOCKED: {
            response_code: "E_BLOCKED",
            message: 'You are Blocked.Please contact to admin',
            status: 403
        },

        ERROR_VARIFICATION_EMAIL: {
            response_code: "E_VERIFICATION_FAIL",
            message: 'Something went wrong in sending verification mail,please try again later.',
            status: 405
        },

        ERROR_INSERT_USER: {
            response_code: "E_INSERT_ERROR",
            message: 'Error occured in inserting user, please try again later.',
            status: 500
        },

        ERROR_SEND_VERIFICATION_MAIL: {
            response_code: "E_SEND_VERIFICATION_MAIL",
            message: 'Error occured in sending verification mail, please try again later.',
            status: 600
        },

        ERROR_EMAIL_NOT_FOUND: {
            response_code: "E_EMAIL_NOT_FOUND",
            message: 'Email valid email address.',
            status: 601
        },

        COMPLETE_USER_REGISTRATION: {
            response_code: "E_SUCCESS",
            message: 'Complete your account registration.',
            status: 200
        },

        OLD_PASSWORD_NOT_CURRECT: {
            response_code: "E_NOT_MATCH",
            message: 'Old Password is not currect.',
            status: 406
        },

        LINK_EXPIRED_OR_WRONG_VERIFICATION_CODE: {
            response_code: "E_VERIFACTION_ERROR",
            message: 'Your link has expired or invalid verification code.',
            status: 602
        },

        ERROR_USER_VERIFICATION: {
            response_code: "E_VERIFACTION_USER",
            message: 'Something went wrong during user verification, please try again later.',
            status: 602
        },

        USER_INVITATION_NOT_FOUND: {
            response_code: "E_INVITATION_FAILED",
            message: 'User invitation setting not found.',
            status: 602
        },

        ERROR_PUSH_NOTIFICATION: {
            response_code: "E_PUSH_ERROR",
            message: 'Something went wrong to send notification to nearer user.',
            status: 604
        },

        ERROR_NOT_CHECKED: {
            response_code: "E_NOT_CHECKED",
            message: "Stop! The app is locked until your evaluation has been reviewed.",
            status: 606
        },

        ERROR_VERIFIED: {
            response_code: "E_ALREDY_DONE",
            message: "You already passed in submission.",
            status: 607
        },

        ALREADY_VISITED_RESET_PASSWORD: {
            response_code: "E_ALREADY_VISITED",
            message: "Link was already expired, if you still facing issues with login then try to reset password by clicking on <b>Forget your password</b> or contact company admin to reset it.",
            status: 607
        },

        RESET_PASSWORD_VERIFIED: {
            response_code: "E_ALREADY_VERIFIED",
            message: "Link was already expired, if you still facing issues with login then try to reset password by clicking on <b>Forget your password</b> or contact company admin to reset it.",
            status: 607
        },

        RESET_PASSWORD_LINK_EXPIRED: {
            response_code: "E_EXPIRED",
            message: "Link was already expired, if you still facing issues with login then try to reset password by clicking on <b>Forget your password</b> or contact company admin to reset it.",
            status: 607
        },

        ERROR_EDITING_EMAIL: {
            response_code: "E_NOT_PERMITTED",
            message: "You can not edit your email.",
            status: 401
        },

        INVALID_EMAIL: {
            response_code: "E_INVALID_EMAIL",
            message: "Email you provided is invalid.",
            status: 404
        },

        ORGANIZATIONS_NOT_PRESENT: {
            response_code: "E_ORGANIZATION_EXSITS",
            message: "Organization with this email is not exist",
            status: 404
        },

        PASSWORD_MISSMATCH: {
            response_code: "E_PASSWORD_MISSMATCH",
            message: "Provided password is not correct.",
            status: 422
        },

        SERVICES_NOT_PRESENT: {
            response_code: "E_SERVICES_EXSITS",
            message: "Service is not exist",
            status: 404
        },

        SESSION_TOKEN_NOT_VALID: {
            response_code: "E_SERVICES_TOKEN",
            message: "Service token is not valid",
            status: 401
        },

        TOKEN_IS_VALID: {
            response_code: "E_SERVICES_TOKEN",
            message: "Token is valid",
            status: 200
        },

        OTP_EXPIRED: {
            response_code: "E_INVALID_TOKEN",
            message: "OTP is expired",
            status: 700
        },

        SERVICE_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "Service name already exists",
            status: 401
        },
        SCHEDULE_SERVICE_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "Service is already exists. Please check Expire range, Doctor, Service Or Active flag",
            status: 401
        },
        LABEL_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "Label already exists",
            status: 401
        },
        COUNTRY_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "Country name already exists",
            status: 401
        },
        STATE_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "State name already exists",
            status: 401
        },
        CITY_EXISTS: {
            response_code: "E_INVALID_ENTITY",
            message: "City name already exists",
            status: 401
        },
        ENTITY_NOT_PRESENT: {
            response_code: "E_ENTITY_NOT_PRESENT",
            message: "Request entity not present",
            status: 401
        },
        ENTITY_PRESENT: {
            response_code: "E_ENTITY_PRESENT",
            message: "Entity already present",
            status: 401
        },
        SURVEY_PUBLISH: {
            response_code: "E_SURVEY_PUBLISH",
            message: "One survey is already publish. Please wait for that complete",
            status: 401
        },
        SURVEY_IS_ALREADY_ANSWERED: {
            response_code: "E_SURVEY_IS_ALREADY_ANSWERED",
            message: "You have answered survey already. Please wait for the next one",
            status: 401
        },
        EMAIL_NAME_PRESENT: {
            response_code: "E_ENTITY_PRESENT",
            message: "Email or domain name already present",
            status: 401
        },
        REQUEST_PRESENT: {
            response_code: "E_REQUEST_PRESENT",
            message: "Request is already present for this",
            status: 401
        },

    }
};
