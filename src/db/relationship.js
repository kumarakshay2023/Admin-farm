const { sequelize } = require('./models');

const Users = sequelize.import("./users");
const Otp = sequelize.import("./otp");

module.exports = {
    Users,
    Otp

}