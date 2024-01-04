const { timestampHook } = require("../hooks");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        mobile: {
            type: DataTypes.BIGINT,
            unique:true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_email_verified: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.BIGINT
        },
        updated_at: {
            type: DataTypes.BIGINT
        }
    }, {
        tableName: 'stores',
        timestamps: false,
        hooks: timestampHook,
    });
};