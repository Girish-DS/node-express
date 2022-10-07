const mysql = require('mysql');
const config = require('../config/config.json');

const pool = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: 3306
})

pool.connect((err) => {
    if(err)
        throw err
    else 
        console.log("DB Connected..")      
})

module.exports = pool;