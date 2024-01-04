const { sequelize } = require('./models');

const Stores = sequelize.import("./stores");
const Otp = sequelize.import("./otp");

module.exports = {
    Stores,
    Otp

}