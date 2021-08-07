'use strict';

let DATABASE = {
    PROJECT: 'PROJECT',
    USER_ROLES: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        COMMON: 'COMMON'
    },

    TOKEN_FIELDS: {
        ACCESS_TOKEN: 'accessToken',
        EMAIL_VERIFICATION: 'emailVerificationToken',
        PASSWORD_RESET: 'passwordResetToken'
    },

    PROFILE_PIC_PREFIX: {
        ORIGINAL: "ORIGINAL",
        THUMB: "THUMB"
    },



    SERVICE_TYPE: {
        SELL: 1,
        REPAIR: 2
    },
    QUESTION_TYPE :{
        SINGLE_CHOICE : 1,
        MULTI_CHOICE : 2,
        INPUT:3,
        DROPDOWN:4
    },
    DISPLAY_TYPE :{
        Yes:"Yes",
        No:"No"
    
    },
    PROGRAM_TYPE :{ 
        PACKAGE1:"PACKAGE1",
        PACKAGE2:"PACKAGE2",
        PACKAGE3:"PACKAGE3",
        PACKAGE4:"PACKAGE4"
    },
    USER_TYPE :{ 
        MENTOR:1,
        MENTEE:2,
    }
}


let LANGUAGE_TYPE = {
    ENGLISH: 1,
    SPANISH: 2
}

let DEVICE_TYPE = {
    ANDROID: "ANDROID",
    IOS: "IOS",
    WEB: "WEB"
}
let CATEGORY_TYPE = {
  SHEVOLVE_DESK: 1,
  GUEST_WRITERS: 2,
  LEARNING_OPPORTUNITY: 3,
};

let STATUS_MSG = {
    ERROR: {
        INVALID_TOKEN: {
            statusCode: 401,
            customMessage: 'Your session has been expired.',
            type: 'INVALID_TOKEN'
        },
        NUMBER_ALREADY_EXIST: {
            statusCode: 409,
            customMessage: 'Number you have entered already exist.',
            type: 'NUMBER_ALREADY_EXIST'
        },
        PHONE_NUMBER_NOT_EXIST: {
            statusCode: 400,
            customMessage: 'Phone number you have entered doesn\'t exist or not verified',
            type: 'PHONE_NUMBER_NOT_EXIST'
        },
        ACCOUNT_NOT_VERIFIED: {
            statusCode: 400,
            customMessage: 'Your account is not verified',
            type: 'ACCOUNT_NOT_VERIFIED'
        },

        OTP_NOT_EXIST: {
            statusCode: 400,
            customMessage: 'Otp you have entered not valid or has expired, please enter correct otp.',
            type: 'OTP_NOT_EXIST'
        },
        SESSION_EXPIRED: {
            statusCode: 401,
            customMessage: 'Your session has been expired. Please login again to continue',
            type: 'SESSION_EXPIRED'
        },
        ALREADY_EXISTS_EMAIL: {
            statusCode: 409,
            customMessage: 'Email or Phone number you have entered already exist. Please try with another email :)',
            type: 'ALREADY_EXISTS_EMAIL'
        }, 
        ALREADY_EXISTS_TRUCK: {
            statusCode: 400,
            customMessage: 'Truck already exists :)',
            type: 'ALREADY_EXISTS_TRUCK'
        }, 
        ALREADY_ASSIGNED_REPAIRER: {
            statusCode: 400,
            customMessage: 'Already Assigned Repair Man :)',
            type: 'ALREADY_EXISTS_TRUCK'
        }, 


        INVALID_PASSWORD: {
            statusCode: 400,
            customMessage: 'Password you have enter does not match',
            type: 'INVALID_PASSWORD'
        },

        INVALID_OLD_PASSWORD: {
            statusCode: 400,
            customMessage: 'Old Password you have enter does not match',
            type: 'INVALID_OLD_PASSWORD'
        },
        SAME_PASSWORD: {
            statusCode: 400,
            customMessage: 'Old password and new password shouldn\'t be same',
            type: 'SAME_PASSWORD'
        },

        INCORRECT_OLD_PASSWORD: {
            statusCode: 400,
            customMessage: 'Old password you have entered doesn\'t match',
            type: 'INCORRECT_OLD_PASSWORD'
        },
        INCORRECT_CONFIRM_PASSWORD: {
            statusCode: 400,
            customMessage: 'confirm password and new password should be same',
            type: 'INCORRECT_CONFIRM_PASSWORD'
        },

        UNAUTHORIZED: {
            statusCode: 401,
            customMessage: 'You are not authorized to perform this action',
            type: 'UNAUTHORIZED'
        },

        INVALID_EMAIL: {
            statusCode: 400,
            customMessage: 'Please enter correct email',
            type: 'INVALID_EMAIL'
        },
        INVALID_IMAGE_FORMAT: {
            statusCode: 400,
            customMessage: 'Image should be of valid format.',
            type: 'INVALID_EMAIL'
        },


        BLOCKED_USER: {
            statusCode: 400,
            customMessage: 'Your account has been blocked, Please contact to admin.',
            type: 'BLOCKED_USER'
        },





        SOMETHING_WENT_WRONG: {
            statusCode: 400,
            type: 'SOMETHING_WENT_WRONG',
            customMessage: 'Something went wrong. '
        },
        IMP_ERROR: {
            statusCode: 500,
            customMessage: 'Implementation Error',
            type: 'IMP_ERROR'
        },

        DB_ERROR: {
            statusCode: 400,
            customMessage: 'DB Error : ',
            type: 'DB_ERROR'
        },
        DUPLICATE: {
            statusCode: 400,
            customMessage: 'Duplicate Entry',
            type: 'DUPLICATE'
        },
        DUPLICATE_ADDRESS: {
            statusCode: 400,
            customMessage: 'Duplicate address',
            type: 'DUPLICATE_ADDRESS'
        },
        APP_ERROR: {
            statusCode: 400,
            customMessage: 'Application error ',
            type: 'APP_ERROR'
        },
        INVALID_ID: {
            statusCode: 400,
            customMessage: 'Invalid id ',
            type: 'INVALID_ID'
        },

    },
    SUCCESS: {

        SOCKET_CONNECTED: {
            statusCode: 200,
            customMessage: 'Connected Successfully',
            type: 'SOCKET_CONNECTED'
        },

        CREATED: {
            statusCode: 200,
            customMessage: 'Created Successfully',
            type: 'CREATED'
        },
        REGISTERED: {
            statusCode: 200,
            customMessage: 'Registered Successfully',
            type: 'REGISTERED'
        },
        UPDATED: {
            statusCode: 200,
            customMessage: 'Updated Successfully',
            type: 'APPROVED'
        },
        DELETED: {
            statusCode: 200,
            customMessage: 'Deleted Successfully',
            type: 'DELETED'
        },
        DEFAULT: {
            statusCode: 200,
            customMessage: 'Success',
            type: 'DEFAULT'
        },
        VERIFIED: {
            statusCode: 200,
            customMessage: 'Verified Successfully',
            type: 'VERIFIED'
        },
        VERIFICATION: {
            statusCode: 200,
            customMessage: 'Verification link sent successfully',
            type: 'VERIFICATION'
        },

        APPROVE_EMAIL: {
            statusCode: 200,
            isVerified: false,
            customMessage: 'Please verify your email first',
            type: 'APPROVE_EMAIL'
        },

    }
}

let swaggerDefaultResponseMessages = [
    { code: 200, message: 'OK' },
    { code: 400, message: 'Bad Request' },
    { code: 401, message: 'Unauthorized' },
    { code: 404, message: 'Data Not Found' },
    { code: 500, message: 'Internal Server Error' }
];

let NOTIFICATION_TYPE = {
    NEW_REQUEST: 1,
    OFFER_MADE: 2,
    OFFER_ACCEPTED: 3,
    OFFER_REJECTED: 4,
    USER_RATED: 5,
    ADMIN_NOTIFICATION: 6
}

var APP_CONSTANTS = {
  LANGUAGE_TYPE: LANGUAGE_TYPE,
  DEVICE_TYPE: DEVICE_TYPE,
  DATABASE: DATABASE,
  STATUS_MSG: STATUS_MSG,
  swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
  NOTIFICATION_TYPE: NOTIFICATION_TYPE,
  CATEGORY_TYPE: CATEGORY_TYPE,
};

module.exports = APP_CONSTANTS;
