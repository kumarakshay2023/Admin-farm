const jwt = require("jsonwebtoken");
const config = require('../config')
const { tables } = require("../db");

module.exports = () => {
    return async (req, res, next) => {
        const token = req.headers["authorization"].replace('Bearer', '').replace('bearer', '').replace('BEARER', '').replace(' ', '')
        if (!token) return res.status(403).send("Invalid token!")
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        if (decoded.id) {
            const user = await tables.Users.findOne({ where: { id: decoded.id, isDeleted: false }, raw: true })
            if (user) req.user = decoded;
            else return res.status(401).send("Unauthorized!")
        } else return res.status(401).send("Unauthorized!")
        return next()
    }
}