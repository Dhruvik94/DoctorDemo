'use strict';
const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');
const { Sequelize } = require('../config/sequelize');

module.exports = {
    addAuth: async (req, res) => {

        if (!req.body.domain_id || !req.body.api_end_point || !req.body.user_name || !req.body.password) {
            return res.status(204).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let authenticate = await sequelize.authenticate.findAll({
                where: {

                    domain_id: req.body.domain_id
                }
            });


            if (authenticate.length === 0) {

                req.body.domain_id = req.body.domain_id;
                req.body.api_end_point = req.body.api_end_point;
                req.body.user_name = req.body.user_name;
                req.body.password = req.body.password;
                // req.body.is_active = req.body.is_active;
                if (req.body.is_active === true) {
                    req.body.is_active = true;
                } else {
                    req.body.is_active = false;
                }

                req.body.created_at = helpers.getUTCDateTime();
                req.body.updated_at = helpers.getUTCDateTime();

                await sequelize.authenticate.create(req.body);

                return res.status(200).send(error.OK);

            } else {
                return res.status(402).send(error.ENTITY_PRESENT);
            }

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });


    },

    getAllAuth: async (req, res) => {

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.authenticate.findAll({
            });

            var result = { status: 200, data: data }
            return res.status(200).send(result);

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getAuth: async (req, res) => {
        if (!req.query.id) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {

            let data = await sequelize.authenticate.findOne({
                where: {
                    id: req.query.id
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


    editAuth: async (req, res) => {
        if (!req.body.id) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let result = {};

            if (req.body.domain_id) {
                result.domain_id = req.body.domain_id;
            }

            if (req.body.api_end_point) {
                result.api_end_point = req.body.api_end_point;
            }

            if (req.body.user_name) {
                result.user_name = req.body.user_name;
            }

            if (req.body.password) {
                result.password = req.body.password;
            }
            if (req.body.is_active === true) {
                result.is_active = true;
            } else {
                result.is_active = false;
            }

            result.updated_at = helpers.getUTCDateTime();

            let domain = await sequelize.authenticate.findAll({
                where: {
                    domain_id: { [Sequelize.Op.ne]: req.body.domain_id },
                    id: req.body.id
                }
            });
            if (domain.length === 0) {

                if (req.body.id) {
                    result.id = req.body.id;
                }
                await sequelize.authenticate.update(result, { where: { id: req.body.id } });

                return res.status(200).send(error.OK);
            } else {

                return res.status(401).send(error.ENTITY_PRESENT);
            }


        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    deleteAuth: async (req, res) => {

        if (!req.body.id) {
            return res.status(402).send(error.MANDATORY_FIELDS)
        }
        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.authenticate.findAll({
                where: {
                    id: req.body.id
                }
            });

            if (data.length === 0) {
                return res.status(402).send(error.ENTITY_NOT_PRESENT);
            } else {
                data = await sequelize.authenticate.destroy({
                    where: {
                        id: req.body.id
                    }
                });
                let result = error.OK
                result.data = data
                return res.status(200).send(result);
            }

        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        })
    },

    updateStatus: async (req, res) => {
        if (!req.body.id || !req.body.is_active) {
            return res.status(422).json(error.MANDATORY_FIELDS);
        }
        sequelize.sequelize.transaction(async (t1) => {
            var result = {};
            result.is_active = req.body.is_active;
            result.updated_at = helpers.getUTCDateTime();
            await sequelize.authenticate.update(result, { where: { id: req.body.id } });
            return res.status(200).send(error.OK);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },


}