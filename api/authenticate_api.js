'use strict';
const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');

module.exports = {
    authenticateUser: async (req, res) => {

        if (req.body.body_encrypted) {
            let original_data = helpers.decrypt(req.body.body_encrypted);
            console.log(original_data);
            req.body = original_data;
        }

        if (!req.body.email || !req.body.password) {
            return res.status(204).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let user = await sequelize.users.findOne({
                where: {
                    email: req.body.email,
                    is_active: true,
                }
            });

            if (!user) {
                return res.status(401).send(error.INVALID_CREDENTIAL);
            }
            else if (user) {

                if (!helpers.comparePassword(user.password, req.body.password)) {
                    return res.status(401).send(error.INVALID_CREDENTIAL);
                }
                else {

                    const sessionToken = helpers.generateSessionToken();
                    const generateOTP = helpers.generateOTP();

                    var verify_otp = {};
                    verify_otp.session_token = sessionToken;
                    verify_otp.email = req.body.email;
                    verify_otp.otp = generateOTP;
                    verify_otp.created_at = helpers.getUTCDateTime();
                    verify_otp.updated_at = helpers.getUTCDateTime();
                    verify_otp.otp_generate_time = new Date(new Date().toUTCString());;
                    verify_otp.name = user.first_name + " " + user.last_name;
                    verify_otp.language = user.language;

                    await sequelize.verify_otp.destroy({ where: { email: user.email } });
                    await sequelize.verify_otp.create(verify_otp)
                    console.log(generateOTP);

                    var result = error.OTP_SEND;
                    result.sessiontoken = sessionToken;
                    return res.status(200).send(result);
                }
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    verifyOTP: async (req, res) => {

        if (req.body.body_encrypted) {
            let original_data = helpers.decrypt(req.body.body_encrypted);
            console.log(original_data);
            req.body = original_data;
        }

        if (!req.headers.sessiontoken || !req.body.otp) {
            return res.status(204).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            var token = await sequelize.verify_otp.findOne({
                where: {
                    session_token: req.headers.sessiontoken,
                    is_active: true,
                }
            });

            console.log("token >>" + JSON.stringify(token));

            if (!token) {
                return res.status(401).send(error.SESSION_TOKEN_NOT_VALID);
            }
            else if (token) {

                var currentDate = new Date(new Date().toUTCString());
                var otpGenerateDate = new Date(new Date(token.otp_generate_time).toUTCString());
                const dateDifference = helpers.dateDifference(currentDate, otpGenerateDate);

                if (token.otp !== parseInt(req.body.otp)) {
                    return res.status(401).send(error.VERIFICATION_FAILURE);
                }
                else if (dateDifference.seconds() > 600) {
                    return res.status(700).send(error.OTP_EXPIRED);
                }
                else {

                    await sequelize.verify_otp.update({ is_active: false }, { where: { email: token.email } });

                    let user = await sequelize.users.findOne({
                        where: {
                            email: token.email,
                            is_active: true,
                        }
                    });


                    token = helpers.generateUserToken(user.id, user.title, user.email, user.role, user.first_name, user.last_name,
                        user.mobile, user.address, user.language, user.domain_id);

                    var result = error.LOGIN_DONE;
                    result.token = token;
                    return res.status(200).send(result);
                }

            }

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    verifyToken: async (req, res) => {
        return res.status(200).send(error.TOKEN_IS_VALID);
    },

    passwordPolicy: async (req, res) => {

        try {

            if (req.body.body_encrypted) {
                let original_data = helpers.decrypt(req.body.body_encrypted);
                req.body = original_data;
            }

            if (!req.body.encrypted_data) {
                return res.status(204).json(error.MANDATORY_FIELDS);
            }

            console.log("req.body.encrypted_data >>" + req.body.encrypted_data);

            let original_data = await helpers.decrypt(req.body.encrypted_data);
            // let datas = await sequelize.users.findOne({
            //     where: {
            //         domain_id: original_data.domain_id,
            //     }
            // });

            if (!helpers.isValidEmail(original_data.email)) {
                return res.status(422).json(error.INVALID_EMAIL);
            }

            sequelize.sequelize.transaction(async (t1) => {

                let data = await sequelize.users.findOne({
                    where: {
                        email: original_data.email,
                        is_active: true,
                    }
                });

                let domain_data = await sequelize.domain.findOne({ where: { id: data.domain_id } });

                let passwordPolicy = await sequelize.passwordpolicy.findOne({
                    where: {
                        domain_id: domain_data.id
                    }
                });
                var result = { status: 200, data: passwordPolicy }
                return res.status(200).send(result);

            }).catch(function (err) {
                console.log(err)
                return res.status(500).send(error.SERVER_ERROR);
            });
        } catch (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        };
    },

}