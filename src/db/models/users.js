const { timestampHook } = require("../hooks");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(60)
        },
        first_name: {
            type: DataTypes.STRING(60),
        },
        last_name: {
            type: DataTypes.STRING(60),
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        droc_id: {
            type: DataTypes.STRING(20)
        },
        password: {
            type: DataTypes.STRING,
        },
        profile_image: {
            type: DataTypes.STRING,
        },
        county_code: {
            type: DataTypes.STRING(5),
        },
        phone: {
            type: DataTypes.BIGINT,
        },
        dob: {
            type: DataTypes.BIGINT,
        },
        gender: {
            type: DataTypes.BIGINT,
            type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
        },
        is_email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.BIGINT
        },
        updated_at: {
            type: DataTypes.BIGINT
        }
    }, {
        tableName: 'users',
        timestamps: false,
        hooks: timestampHook,
    });
};