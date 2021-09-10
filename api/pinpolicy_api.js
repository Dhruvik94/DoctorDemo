'use strict';

const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');

module.exports = {

    addPinpolicy: async (req, res) => {
        if (!req.body.digits || !req.body.days_rotate) {
            return res.status(402).send(error.MANDATORY_FIELDS);
        }

        req.body.created_at = helpers.getUTCDateTime();
        req.body.updated_at = helpers.getUTCDateTime();
        req.body.is_active = req.body.is_active;

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.pinpolicy.findAll({
            });
            if (data.length === 0) {
                await sequelize.pinpolicy.create(req.body);
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

    updatePinpolicy: async (req, res) => {
        if (!req.body.id || !req.body.digits || !req.body.days_rotate) {
            return res.status(402).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            req.body.updated_at = helpers.getUTCDateTime();
            await sequelize.pinpolicy.update(req.body, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getPinpolicies: async (req, res) => {
        sequelize.pinpolicy.findAll({

        }).then(function (data) {
            var result = { status: 200, data: data }
            return res.status(200).send(result);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getPinpolicy: async (req, res) => {
        if (!req.query.id) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }
        sequelize.pinpolicy.findOne({
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

    updatePinpolicyStatus: async (req, res) => {
        if (!req.body.id || !req.body.is_active) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }
        sequelize.sequelize.transaction(async (t1) => {
            var result = {};
            result.is_active = req.body.is_active;
            result.updated_at = helpers.getUTCDateTime();
            await sequelize.pinpolicy.update(result, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },
    deletePinPolicy: async (req, res) => {

        if (!req.body.id) {
            return res.status(402).send(error.MANDATORY_FIELDS)
        }
        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.pinpolicy.findAll({
                where: {
                    id: req.body.id
                }
            });
            data = await sequelize.pinpolicy.destroy({
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