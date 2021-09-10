'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('authenticat', {
        domain_id: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            references: {
                model: 'domain',
                key: 'id'
            }
        },
        api_end_point: {
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
        tableName: 'authenticat'
    });
};
