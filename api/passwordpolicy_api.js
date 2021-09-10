'use strict';

const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');
const { Sequelize } = require('../config/sequelize');

module.exports = {

    addPasswordPolicy: async (req, res) => {

        req.body.created_at = helpers.getUTCDateTime();
        req.body.updated_at = helpers.getUTCDateTime();
        req.body.is_active = req.body.is_active;

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.passwordpolicy.findAll({
                where: {
                    domain_id: req.body.domain_id
                }
            });
            if (data.length === 0) {
                await sequelize.passwordpolicy.create(req.body);
                return res.status(200).send(error.OK);
            }
            else {
                var result = error.ENTITY_PRESENT;
                return res.status(401).send(error.ENTITY_PRESENT);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    updatePasswordpolicy: async (req, res) => {
        if (!req.body.id) {
            return res.status(204).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            req.body.updated_at = helpers.getUTCDateTime();
            let domain = await sequelize.passwordpolicy.findAll({
                where: {
                    id: { [Sequelize.Op.ne]: req.body.id },
                    domain_id: req.body.domain_id,
                }
            });

            if (domain.length === 0) {

                if (req.body.domain_id) {
                    req.body.domain_id = req.body.domain_id;
                }
                await sequelize.passwordpolicy.update(req.body, { where: { id: req.body.id } });
                return res.status(200).send(error.OK);
            }
            else {
                return res.status(401).send(error.ENTITY_PRESENT);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getPasswordPolicies: async (req, res) => {
        sequelize.passwordpolicy.findAll({

        }).then(function (data) {
            var result = { status: 200, data: data }
            return res.status(200).send(result);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getPasswordPolicy: async (req, res) => {
        if (!req.query.id) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }
        sequelize.passwordpolicy.findOne({
            where: {
                id: req.query.id
            },

        }).then(function (data) {
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

    updatePasswordPolicyStatus: async (req, res) => {
        if (!req.body.id || !req.body.is_active) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }
        sequelize.sequelize.transaction(async (t1) => {
            var result = {};
            result.is_active = req.body.is_active;
            result.updated_at = helpers.getUTCDateTime();
            await sequelize.passwordpolicy.update(result, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    deletePasswordpolicy: async (req, res) => {

        if (!req.body.id) {
            return res.status(402).send(error.MANDATORY_FIELDS)
        }
        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.passwordpolicy.findAll({
                where: {
                    id: req.body.id
                }
            });
            data = await sequelize.passwordpolicy.destroy({
                where: {
                    id: req.body.id
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
}