const { timestampHook } = require("../hooks");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
        },
        tshirt_size: {
            type: DataTypes.BIGINT,
            type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
        },
        address: {
            type: DataTypes.STRING,
        },
        city_id: {
            type: DataTypes.BIGINT,
        },
        zip_code: {
            type: DataTypes.BIGINT,
        },
        emergency_contact_name: {
            type: DataTypes.STRING(60),
        },
        county_code: {
            type: DataTypes.STRING(5),
        },
        emergency_phone: {
            type: DataTypes.BIGINT,
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
