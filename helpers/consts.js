const APPOINMENT_TIME_DIFFERENCE = 100000000;
const APPOINMENT_VIDEO_CRONJOB = "upload_appoinment_video";
const APPOINMENT_VIDEO_CRONJOB_ID = 1;
const SUPER_ORGANIZATION_ID = 1;

const templatename = {
    // SIGNUP: {
    //     KEY: 1,
    //     VALUE: "Signup Template"
    // },
    ACCOUNT_ACTIVATION: {
        KEY: 2,
        VALUE: "Account Activation Template"
    },
    CHANGE_PASSWORD: {
        KEY: 3,
        VALUE: "Change Password Template"
    },
    TWO_FACTOR_VERIFICATION: {
        KEY: 4,
        VALUE: "2FA Verification Template"
    },
    APPOINMENT_BOOK: {
        KEY: 5,
        VALUE: "Appoinment Book Template"
    },
    OTHER: {
        KEY: 6,
        VALUE: "Other"
    },
};

const getAllEmailTemplatesType = () => {

    return jsonData = [
        // {
        //     'Id': templatename.SIGNUP.KEY,
        //     'Name': templatename.SIGNUP.VALUE
        // },
        {
            'Id': templatename.ACCOUNT_ACTIVATION.KEY,
            'Name': templatename.ACCOUNT_ACTIVATION.VALUE
        },
        {
            'Id': templatename.CHANGE_PASSWORD.KEY,
            'Name': templatename.CHANGE_PASSWORD.VALUE
        },
        {
            'Id': templatename.TWO_FACTOR_VERIFICATION.KEY,
            'Name': templatename.TWO_FACTOR_VERIFICATION.VALUE
        },
        {
            'Id': templatename.APPOINMENT_BOOK.KEY,
            'Name': templatename.APPOINMENT_BOOK.VALUE
        },
        {
            'Id': templatename.OTHER.KEY,
            'Name': templatename.OTHER.VALUE
        }
    ]
}


let emailtemplatetype = {
    getAllEmailTemplatesType,
    templatename,
    APPOINMENT_TIME_DIFFERENCE,
    APPOINMENT_VIDEO_CRONJOB,
    APPOINMENT_VIDEO_CRONJOB_ID,
    SUPER_ORGANIZATION_ID
}

module.exports = emailtemplatetype;
