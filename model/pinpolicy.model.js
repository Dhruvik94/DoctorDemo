'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('pinpolicy', {
        digits: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        days_rotate: {
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
        tableName: 'pinpolicy'
    });
};
