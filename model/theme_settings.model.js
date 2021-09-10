'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('theme_settings', {
        user_id: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        theme: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nav_style_type: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nav_style_option: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        layout: {
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
        tableName: 'theme_settings'
    });
};
