'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('domain', {
        domain_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        tableName: 'domain'
    });
};
