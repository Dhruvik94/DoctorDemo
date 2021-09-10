'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('passwordpolicy', {
        digits: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        letters: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        symbols: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        special_characters: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        uppercase: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        lowercase: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        days_rotate: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        minimum_length: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        maximum_length: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        domain_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            references: {
                model: 'domain',
                key: 'id'
            }
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
        tableName: 'passwordpolicy'
    });
};
