'use strict';

module.exports = function (sequelize, DataTypes, Sequelize) {

    return sequelize.define('verify_otp', {
        session_token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        otp: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        otp_generate_time: {
            type: 'TIMESTAMP',
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'verify_otp'
    });
};
