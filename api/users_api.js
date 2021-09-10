'use strict';
var bcrypt = require("bcryptjs");
const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');
const Role = require('../helpers/role');
const UserType = require('../helpers/user_type');
const { signupEmail, forgorPasswordEmail } = require('../helpers/email');


var fs = require("fs");
const { Sequelize } = require("../config/sequelize");

module.exports = {

    addSiteAdmin: async (req, res) => {

        if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.domain_id) {
            return res.status(204).json(error.MANDATORY_FIELDS);
        }

        if (!helpers.isValidEmail(req.body.email)) {
            return res.status(404).json(error.INVALID_EMAIL);
        }

        if (!req.decoded || !req.decoded.user_id) {
            return res.status(422).json(error.UNAUTHORIZED);
        }

        req.body.email = req.body.email.toLowerCase();

        sequelize.sequelize.transaction(async (t1) => {

            let user = await sequelize.users.findAll({
                where: {

                    email: req.body.email
                }
            });
            if (user.length === 0) {

                let domain = await sequelize.users.findAll({
                    where: {
                        domain_id: req.body.domain_id
                    }
                });

                if (domain.length === 0) {

                    req.body.created_by = req.decoded.user_id;
                    req.body.is_active = req.body.is_active;
                    req.body.is_confirmed = true;
                    req.body.created_at = helpers.getUTCDateTime();
                    req.body.updated_at = helpers.getUTCDateTime();
                    req.body.role = Role.SITE_ADMIN;
                    req.body.signup_token = new Date().getTime();
                    req.body.user_type = UserType.SITE_ADMIN;
                    // req.body.password = bcrypt.hashSync(req.body.password, 10);

                    await sequelize.users.create(req.body);
                    await signupEmail(req.body)


                    return res.status(200).send(error.OK);

                } else {
                    return res.status(402).send(error.ENTITY_PRESENT);
                }
            } else {
                return res.status(402).send(error.EMAIL_ID_ALREADY_EXITS);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    getAllSiteAdmin: async (req, res) => {

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.users.findAll({
                where: {
                    user_type: UserType.SITE_ADMIN
                },
                attributes: { exclude: ['password', 'signup_token'] },

            });

            var result = { status: 200, data: data }
            return res.status(200).send(result);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    getSiteAdmin: async (req, res) => {
        if (!req.query.email) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.users.findOne({
                where: {
                    email: req.query.email
                },
                attributes: { exclude: ['password', 'signup_token'] },

            });
            var result
            if (data) {
                result = { status: 200, data: data }
                return res.status(200).send(result)
            } else {

                result = { status: 205, data: data }
                return res.status(205).send(error.DATA_NOT_FOUND);
            }

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    editSiteAdmin: async (req, res) => {
        if (!req.body.id || !req.body.first_name || !req.body.last_name || !req.body.mobile) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let result = {};

            if (req.body.first_name) {
                result.first_name = req.body.first_name;
            }

            if (req.body.last_name) {
                result.last_name = req.body.last_name;
            }

            if (req.body.mobile) {
                result.mobile = req.body.mobile;
            }

            if (req.body.address) {
                result.address = req.body.address;
            }

            if (req.body.start_time) {
                result.start_time = req.body.start_time;
            }
            if (req.body.end_time) {
                result.end_time = req.body.end_time;
            }

            if (req.body.is_active === true) {
                result.is_active = true
            } else {
                result.is_active = false

            }

            if (req.body.age) {
                result.age = req.body.age;
            }

            if (req.body.language) {
                result.language = req.body.language;
            }

            if (req.body.confirmation) {
                result.confirmation = req.body.confirmation;
            }

            if (req.body.title) {
                result.title = req.body.title
            }

            if (req.body.user_gov_id) {
                result.user_gov_id = req.body.user_gov_id;
            }

            result.is_latine_user = req.body.is_latine_user;

            result.updated_at = helpers.getUTCDateTime();


            if (req.body.password) {
                delete req.body.password;
            }

            let domain = await sequelize.users.findAll({
                where: {
                    email: { [Sequelize.Op.ne]: req.body.email },
                    domain_id: req.body.domain_id,
                }
            });
            if (domain.length === 0) {

                if (req.body.domain_id) {
                    result.domain_id = req.body.domain_id;
                }
                await sequelize.users.update(result, { where: { id: req.body.id } });

                return res.status(200).send(error.OK);
            } else {

                return res.status(401).send(error.ENTITY_PRESENT);
            }


        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    deleteUser: async (req, res) => {

        if (!req.query.id) {
            return res.status(402).send(error.MANDATORY_FIELDS)
        }
        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.users.findAll({
                where: {
                    id: req.query.id
                }
            });
            data = await sequelize.users.destroy({
                where: {
                    id: req.query.id
                }
            });

            let result = error.OK
            result.data = data
            return res.status(200).send(result);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        })
    },

    updateUserStatus: async (req, res) => {
        if (!req.body.id || !req.body.status) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.users.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (data) {

                let result = {};
                result.is_active = req.body.status;
                result.updated_at = helpers.getUTCDateTime();

                await sequelize.users.update(result, { where: { id: req.body.id } });
                return res.status(200).send(error.OK);
            }
            else {
                return res.status(422).send(error.USER_NOT_FOUND);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    resetPassword: async (req, res) => {
        if (!req.decoded || !req.decoded.user_id) {
            return res.status(422).json(error.UNAUTHORIZED);
        }

        if (!req.body.password || req.body.password === ''
            || !req.body.old_password || req.body.old_password === '') {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.users.findOne({
                where: {
                    id: req.decoded.user_id
                }
            });
            if (data) {

                let result = {};

                if (!helpers.comparePassword(data.password, req.body.old_password)) {
                    return res.status(401).send(error.PASSWORD_MISSMATCH);
                }
                else {

                    result.updated_at = helpers.getUTCDateTime();
                    result.password = helpers.hashPassword(req.body.password);

                    await sequelize.users.update(result, { where: { id: req.decoded.user_id } });
                    return res.status(200).send(error.OK);
                }
            }
            else {
                return res.status(422).send(error.USER_NOT_FOUND);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    forgotPassword: async (req, res) => {

        if (req.body.body_encrypted) {
            let original_data = helpers.decrypt(req.body.body_encrypted);
            console.log(original_data);
            req.body = original_data;
        }

        if (!req.body.encrypted_data || !req.body.password || req.body.password === "") {
            return res.status(200).json(error.MANDATORY_FIELDS);
        }

        let original_data = await helpers.decrypt(req.body.encrypted_data);

        if (!helpers.isValidEmail(original_data.email)) {
            return res.status(200).json(error.INVALID_EMAIL);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.users.findOne({
                where: {
                    email: original_data.email,
                    is_active: true,
                    is_confirmed: true,
                    signup_token: original_data.token.toString()
                }
            });

            if (data) {

                let result = {
                    updated_at: helpers.getUTCDateTime(),
                    signup_token: null,
                    password: helpers.hashPassword(req.body.password)
                };

                await sequelize.users.update(result, { where: { email: original_data.email } });
                return res.status(200).send(error.OK);
            }
            else {
                return res.status(200).send(error.SESSION_TOKEN_NOT_VALID);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    forgotPasswordEmail: async (req, res) => {

        if (req.body.body_encrypted) {
            let original_data = helpers.decrypt(req.body.body_encrypted);
            console.log(original_data);
            req.body = original_data;
        }

        if (!req.body.email) {
            return res.status(204).json(error.MANDATORY_FIELDS);
        }

        if (!helpers.isValidEmail(req.body.email)) {
            return res.status(204).json(error.INVALID_EMAIL);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let user = await sequelize.users.findOne({
                where: {
                    email: req.body.email,
                    is_active: true
                }
            });
            if (user) {
                let result = {
                    updated_at: helpers.getUTCDateTime(),
                    signup_token: new Date().getTime()
                };

                let x = JSON.parse(JSON.stringify(result));

                await sequelize.users.update(result, { where: { email: req.body.email } });

                let parameter = {};
                parameter.signup_token = x.signup_token;
                parameter.email = req.body.email;
                parameter.name = user.first_name + " " + user.last_name;
                parameter.org_department_id = user.org_department_id;
                parameter.language = user.language;

                await forgorPasswordEmail(parameter)
                return res.status(200).send(error.OK);
            }
            else {
                return res.status(204).send(error.USER_NOT_FOUND);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    confirmEmail: async (req, res) => {

        if (req.body.body_encrypted) {
            let original_data = helpers.decrypt(req.body.body_encrypted);
            console.log(original_data);
            req.body = original_data;
        }

        if (!req.body.encrypted_data || !req.body.password || req.body.password === "") {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        let original_data = await helpers.decrypt(req.body.encrypted_data);

        if (!helpers.isValidEmail(original_data.email)) {
            return res.status(422).json(error.INVALID_EMAIL);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.users.findOne({ where: { email: original_data.email } });
            if (data) {
                if (Number(data.signup_token) === Number(original_data.token)) {
                    let result = {};
                    result.is_confirmed = true;
                    result.updated_at = helpers.getUTCDateTime();
                    result.signup_token = null;
                    result.password = helpers.hashPassword(req.body.password);
                    await sequelize.users.update(result, { where: { email: original_data.email } });
                    return res.status(200).send(error.OK);
                }
                else {
                    return res.status(422).send(error.UNAUTHORIZED);
                }
            }
            else {
                return res.status(422).send(error.USER_NOT_FOUND);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getImage: async (req, res) => {

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.users.findOne({
                where: {
                    id: req.decoded.user_id
                }
            });
            var result = { status: 200, data: data }
            return res.status(200).send(result);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    editProfile: async (req, res) => {
        if (!req.decoded || !req.decoded.user_id) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let result = {};

            if (req.body.first_name) {
                result.first_name = req.body.first_name;
            }

            if (req.body.last_name) {
                result.last_name = req.body.last_name;
            }

            if (req.body.mobile) {
                result.mobile = req.body.mobile;
            }

            if (req.body.address) {
                result.address = req.body.address;
            }

            if (req.body.start_time) {
                result.start_time = req.body.start_time;
            }
            if (req.body.end_time) {
                result.end_time = req.body.end_time;
            }

            if (req.body.is_active) {
                result.is_active = req.body.is_active;
            }

            if (req.body.age) {
                result.age = req.body.age;
            }

            if (req.body.title) {
                result.title = req.body.title
            }

            if (req.body.language) {
                result.language = req.body.language
            }

            if (req.body.user_gov_id) {
                result.user_gov_id = req.body.user_gov_id;
            }

            result.updated_at = helpers.getUTCDateTime();

            await sequelize.users.update(result, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    deleteProfile: async (req, res) => {

        sequelize.sequelize.transaction(async (t1) => {

            var obj = {
                "image_file": null,
                "updated_at": helpers.getUTCDateTime()
            }

            await sequelize.users.update(obj, { where: { id: req.decoded.user_id } });
            return res.status(200).send(error.OK);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    uploadDefaultImage: async (req, res) => {
        if (!req.body.file_byte) {
            return res.status(402).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            var data = {
                "image_file": req.body.file_byte,
                "updated_at": helpers.getUTCDateTime()
            }

            await sequelize.users.update(data, { where: { id: req.decoded.user_id } });
            return res.status(200).send(error.OK);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    uploadImage: async (req, res) => {
        if (!req.file) {
            return res.status(402).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let data = {
                "image_file": new Buffer.from(fs.readFileSync(req.file.path)).toString("base64"),
                "updated_at": helpers.getUTCDateTime()
            }

            var resultHandler = function (err) {
                if (err) {
                    console.log("unlink failed", err);
                } else {
                    console.log("file deleted");
                }
            }

            fs.unlink(req.file.path, resultHandler);

            await sequelize.users.update(data, { where: { id: req.decoded.user_id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
}