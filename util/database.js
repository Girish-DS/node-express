const mysql = require('mysql');
const db = require('./config/config.json').db;

const pool = mysql.createConnection({
    host: db.host,
    user: db.user,
    database: db.database,
    password: db.password,
    port: 3306
})

pool.connect((err) => {
    if(err)
        throw err
    else 
        console.log("DB Connected..")      
})

module.exports = pool;