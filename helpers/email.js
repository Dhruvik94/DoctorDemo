'use strict';

const { SIGNUP_ENDPOINT, PASSWORD_RESET_ENDPOINT, APP_LOGO } = require('../config');
const helpers = require('../helpers/validations');
const sequelize = require('../config/sequelize');
const Const = require('../helpers/consts');
var nodemailer = require('nodemailer');

// const getHTMLContentFromFile = async (type, language) => {

//     return new Promise(resolve => {
//         sequelize.emailtemplates.findOne({
//             where: {
//                 organization_id: Const.SUPER_ORGANIZATION_ID,
//                 template_type: type,
//                 template_language: language
//             }
//         }).then(function (emailtemplate) {
//             // console.log("emailtemplate >>" + emailtemplate);
//             if (emailtemplate) {
//                 resolve(emailtemplate);
//             }
//         }).catch(function (err) {
//             console.log(err)
//             resolve(false);
//         });

//     })
// }

// const getDynamicVaribleFromDB = async (data) => {
//     console.log("data >> " + data.org_department_id);

//     return new Promise(resolve => {

//         sequelize.sequelize.transaction(async (t1) => {
//             let department = await sequelize.organizations_department.findOne({
//                 where: {
//                     id: data.org_department_id
//                 },
//                 include: [
//                     { model: sequelize.country },
//                     { model: sequelize.state },
//                     { model: sequelize.city }
//                 ]
//             });

//             let organization = await sequelize.organizations.findOne({
//                 where: {
//                     id: department.organization_id
//                 }
//             });

//             if (organization) {
//                 data.support_email = organization.email;
//                 data.sender_name = organization.contact_person;
//                 data.organization_name = organization.name;
//                 data.organization_address = organization.address;
//                 data.organization_country = department.country.name;
//                 data.organization_state = department.state.name;
//                 data.organization_city = department.city.name;
//             }
//             resolve(data);
//         }).catch(function (err) {
//             console.log(err)
//             resolve(false);
//         });
//     });
// }

// const replaceVariables = async (content, data) => {

//     return new Promise(resolve => {

//         content = content.split("{{PRODUCT_NAME}}").join(data.organization_name);
//         content = content.split("{{NAME}}").join(data.name);
//         content = content.split("{{ACTION_URL}}").join(data.action_url);
//         content = content.split("{{SUPPORT_EMAIL}}").join(data.support_email);
//         content = content.split("{{SENDER_NAME}}").join(data.sender_name);
//         content = content.split("{{ORGANIZATION_NAME}}").join(data.organization_name);
//         content = content.split("{{ADDRESS}}").join(data.organization_address);
//         content = content.split("{{CITY}}").join(data.organization_city);
//         content = content.split("{{STATE}}").join(data.organization_state);
//         content = content.split("{{COUNTRY}}").join(data.organization_country);
//         content = content.split("{{LOGO}}").join(APP_LOGO);

//         if (data.otp)
//             content = content.split("{{OTP}}").join(data.otp);
//         if (data.meeting_id)
//             content = content.split("{{MEETING_ID}}").join(data.meeting_id);
//         if (data.doctor_name)
//             content = content.split("{{DOCTOR_NAME}}").join(data.doctor_name);
//         if (data.appoinment_date)
//             content = content.split("{{APPOINMENT_DATE}}").join(data.appoinment_date);
//         if (data.appoinment_time)
//             content = content.split("{{APPOINMENT_TIME}}").join(data.appoinment_time);
//         if (data.verification_code)
//             content = content.split("{{VERIFICATION_CODE}}").join(data.verification_code);

//         resolve(content);
//     })
// }
const setEmailConfig = async () => {
    let testAccount = await nodemailer.createTestAccount();

    // console.log(data.host);
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'destany.parker90@ethereal.email',
            pass: 'Q6wxk8177xY7BgS48W'
        }
    });


}

// const getEmailConfig = async (data) => {

//     console.log(data.org_department_id);

//     return new Promise(async resolve => {
//         let department = await sequelize.organizations_department.findOne({
//             where: {
//                 id: data.org_department_id
//             }
//         })

//         let organizations = await sequelize.organizations.findOne({
//             where: {
//                 id: department.organization_id
//             }
//         })
//         let emailserver = await sequelize.emailserver.findOne({
//             where: {
//                 organization_id: organizations.id
//             }
//         })
//         if (emailserver) {
//             resolve(emailserver.dataValues);
//         } else {
//             let organizations = await sequelize.organizations.findOne({
//                 where: {
//                     type: "super"
//                 }
//             })
//             let emailserver = await sequelize.emailserver.findOne({
//                 where: {
//                     organization_id: organizations.id
//                 }
//             })
//             resolve(emailserver.dataValues);
//         }
//     }).catch(function (err) {
//         console.log(err)
//         resolve(false);
//     });
// }

const sendEmail = async (data, mailOptions) => {

    try {

        // var getEmailData = await getEmailConfig();
        var transporter = await setEmailConfig();

        mailOptions.from = "destany.parker90@ethereal.email";

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });

    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    signupEmail: async (data) => {
        let linkData = {
            "email": data.email,
            "token": data.signup_token
        }
        let encryptedData = await helpers.encryptLinkData(linkData);
        let requestURL = SIGNUP_ENDPOINT + encryptedData + "&&name=" + data.first_name + " " + data.last_name;

        // var template = await getHTMLContentFromFile(Const.templatename.ACCOUNT_ACTIVATION.KEY, data.language)

        // data = await getDynamicVaribleFromDB(data);
        // data.action_url = requestURL;
        // console.log("Cofirmation Link >>" + requestURL);
        // template.body = await replaceVariables(template.body, data)

        var mailOptions = {
            to: data.email,
            subject: "Sign Up Mail",
            html: `
            <!DOCTYPE html>
               <html>
                  <body>
                    <a href="${requestURL}" >Click on this Link For Forgot Password</a>
                  </body>
               </html>`

        };
        console.log("Sign Up Email Link : " + requestURL);

        try {
            await sendEmail(data, mailOptions);
            return true;

        } catch (e) {
            throw e
        }

    },

    // otpTokenEmail: async (data) => {

    //     var template = await getHTMLContentFromFile(Const.templatename.TWO_FACTOR_VERIFICATION.KEY, data.language);
    //     data = await getDynamicVaribleFromDB(data);
    //     template.body = await replaceVariables(template.body, data)

    //     var mailOptions = {
    //         to: data.email,
    //         subject: template.subject,
    //         html: template.body
    //     };

    //     try {
    //         await sendEmail(data, mailOptions);
    //         return true;

    //     } catch (e) {
    //         throw e
    //     }

    // },

    forgorPasswordEmail: async (data) => {

        let linkData = {
            "email": data.email,
            "token": data.signup_token
        }
        let encryptedData = await helpers.encryptLinkData(linkData);
        let requestURL = PASSWORD_RESET_ENDPOINT + encryptedData;

        // var template = await getHTMLContentFromFile(Const.templatename.CHANGE_PASSWORD.KEY, data.language)

        // data = await getDynamicVaribleFromDB(data);
        // data.action_url = requestURL;
        // console.log("Forgot Password Link >>" + requestURL);
        // template.body = await replaceVariables(template.body, data)

        var mailOptions = {
            to: data.email,
            subject: "Password Forgot",
            html: `
            <!DOCTYPE html>
               <html>
                  <body>
                    <a href="${requestURL}" >Click on this Link For Forgot Password</a>
                  </body>
               </html>`

        };
        console.log("Forgot Password Email Link : " + requestURL);

        try {
            await sendEmail(data, mailOptions);
            return true;

        } catch (e) {
            throw e
        }

    },

   
};
