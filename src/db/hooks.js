
exports.timestampHook = {
    beforeCreate: (record, options) => {
        record.dataValues.created_at = Date.now();
        record.dataValues.updated_at = Date.now();
    },
    beforeUpdate: (record, options) => {
        record.dataValues.updated_at = Date.now();
    }
}




