'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('users', {
        unique_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        mobile: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        domain_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            references: {
                model: 'domain',
                key: 'id'
            }
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        signup_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        created_by: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        user_type: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        personal_pin: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        language: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        confirmation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        image_file: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        is_survey_complete: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'users'
    });
};
