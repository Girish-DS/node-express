const mysql = require('mysql');
const Model = require('objection');
const Knex = require('knex');
const { HOST, USER, DATABASE, PASSWORD, PORT } = require('dotenv').config();

// const pool = mysql.createConnection({
//     host: HOST,
//     user: USER,
//     database: DATABASE,
//     password: PASSWORD,
//     port: PORT
// })

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : HOST,
      port : PORT,
      user : USER,
      password : PASSWORD,
      database : DATABASE
    }
  });

// const knex = Knex({
//     client: 'sqlite3',
//     useNullAsDefault: true,
//     connection: {
//       filename: 'example.db'
//     }
//   });

// Pass the Knex connection to Objection
Model.knex(knex);

knex.connect((err) => {
    if(err)
        throw err
    else 
        console.log("DB Connected..")      
})

module.exports = knex;