const sql = require('../../util/database');

const adminSchema = new sql.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = new adminSchema();