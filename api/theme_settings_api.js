'use strict';

const sequelize = require('../config/sequelize');
const errors = require('../config/errors');
const error = errors.errors;
const helpers = require('../helpers/validations');

module.exports = {

    selectTheme: async (req, res) => {
        if (!req.body.user_id) {
            return res.status(402).send(error.MANDATORY_FIELDS);
        }

        sequelize.sequelize.transaction(async (t1) => {
            let data = await sequelize.theme_settings.findAll({
                where: {
                    user_id: req.body.user_id
                }
            });
            if (data.length == 0) {
                req.body.created_at = helpers.getUTCDateTime();
                req.body.updated_at = helpers.getUTCDateTime();
                await sequelize.theme_settings.create(req.body);
                return res.status(200).send(error.OK);
            }
            else {
                req.body.updated_at = helpers.getUTCDateTime();
                await sequelize.theme_settings.update(req.body, { where: { user_id: req.body.user_id } });
                return res.status(200).send(error.OK);
            }
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    },

    getTheme: async (req, res) => {
        if (!req.query.user_id) {
            return res.status(402).json(error.MANDATORY_FIELDS);
        }
        sequelize.theme_settings.findOne({
            where: {
                user_id: req.query.user_id
            }
        }).then(function (data) {
            var result = { status: 200, data: data }
            return res.status(200).send(result);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).send(error.SERVER_ERROR);
        });
    }
}