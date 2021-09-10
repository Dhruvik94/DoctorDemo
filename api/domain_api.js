'use strict';

const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');
const { Sequelize } = require('../config/sequelize');

module.exports = {

    addDomain: async (req, res) => {

        if (!req.body.domain_name || !req.body.first_name || !req.body.last_name
            || !req.body.address) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }


        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.domain.findAll({ where: { domain_name: req.body.domain_name } });

            if (data.length == 0) {

                req.body.created_at = helpers.getUTCDateTime();
                req.body.updated_at = helpers.getUTCDateTime();
                req.body.domain_name = req.body.domain_name;
                req.body.user_name = req.body.user_name;
                req.body.password = req.body.password;
                req.body.first_name = req.body.first_name;
                req.body.last_name = req.body.last_name;
                req.body.address = req.body.address;


                if (req.body.is_active === true) {
                    req.body.is_active = true;
                } else {
                    req.body.is_active = false;
                }

                data = await sequelize.domain.create(req.body);

                return res.status(200).send(error.OK);

            } else {
                return res.status(403).send(error.DOMAIN_ID_ALREADY_EXITS);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    getAllDomain: async (req, res) => {

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.domain.findAll({
            });

            var result = { status: 200, data: data }
            return res.status(200).send(result);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    getDomain: async (req, res) => {
        if (!req.query.domain_name) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.domain.findOne({
                where: {
                    domain_name: req.query.domain_name
                },

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

    getDomainByUser: async (req, res) => {
        if (!req.decoded.domain_id) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.domain.findOne({
                where: {
                    id: req.decoded.domain_id
                },
                include: [
                    { model: sequelize.passwordpolicy },
                    { model: sequelize.authenticate }
                ]
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
    editDomain: async (req, res) => {
        if (!req.body.id) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let result = {};

            if (req.body.user_name) {
                result.user_name = req.body.user_name;
            }

            if (req.body.password) {
                result.password = req.body.password;
            }

            if (req.body.first_name) {
                result.first_name = req.body.first_name;
            }

            if (req.body.last_name) {
                result.last_name = req.body.last_name;
            }

            if (req.body.address) {
                result.address = req.body.address;
            }
            if (req.body.is_active === true) {
                result.is_active = true;
            } else {
                result.is_active = false;
            }

            result.updated_at = helpers.getUTCDateTime();

            let domain = await sequelize.domain.findAll({
                where: {
                    domain_name: { [Sequelize.Op.ne]: req.body.domain_name },
                    id: req.body.id
                }
            });
            if (domain.length === 0) {

                if (req.body.id) {
                    result.id = req.body.id;
                }
                await sequelize.domain.update(result, { where: { id: req.body.id } });

                return res.status(200).send(error.OK);
            } else {

                return res.status(401).send(error.ENTITY_PRESENT);
            }


        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    deleteDomain: async (req, res) => {

        if (!req.body.domain_name) {
            return res.status(402).send(error.MANDATORY_FIELDS)
        }
        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.domain.findAll({
                where: {
                    domain_name: req.body.domain_name
                }
            });
            data = await sequelize.domain.destroy({
                where: {
                    domain_name: req.body.domain_name
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
    updateDomain: async (req, res) => {
        if (!req.body.id || !req.body.is_active) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }
        sequelize.sequelize.transaction(async (t1) => {
            var result = {};
            result.is_active = req.body.is_active;
            result.updated_at = helpers.getUTCDateTime();
            await sequelize.domain.update(result, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
}