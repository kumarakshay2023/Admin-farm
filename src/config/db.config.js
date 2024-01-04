require("dotenv").config();

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME_DEV,
        "password": process.env.DB_PASSWORD_DEV,
        "database": process.env.DB_DATABASENAME_DEV,
        "host": process.env.DB_HOST_DEV,
        "dialect": process.env.DB_DIALECT_DEV,
        "dialectOptions": {
            "supportBigNumbers": true
        },
        pool: {
            max: 2,
            min: 0,
            acquire: 20000,
            idle: 10000,
            maxUses:3
        },
    },
    "local": {
        "username": process.env.DB_LOCAL_USER,
        "password": process.env.DB_LOCAL_PASSWORD,
        "database": process.env.DB_LOCAL_DATABASE,
        "host": process.env.DB_LOCAL_HOST ,
        "dialect": process.env.DB_LOCAL_DIALECT,
        "dialectOptions": {
            "supportBigNumbers": true
        },
        pool: {
            max: 2,
            min: 0,
            acquire: 20000,
            idle: 10000,
            maxUses:3
        },
    },
    "production": {
        "username": process.env.DB_USERNAME_DEV,
        "password": process.env.DB_PASSWORD_DEV,
        "database": process.env.DB_DATABASENAME_DEV,
        "host": process.env.DB_HOST_DEV,
        "dialect": process.env.DB_DIALECT_DEV,
        "dialectOptions": {
            "supportBigNumbers": true
        },
        pool: {
            max: 2,
            min: 0,
            acquire: 20000,
            idle: 10000,
            maxUses:3
        },
    },
}