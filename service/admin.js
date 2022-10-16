const db = require('../util/database');

module.exports = class Admin {

    static save(data) {
        return db.query(
            'INSERT INTO admin (name, email, password, isDeleted) VALUES (?, ?, ?, ?)', [data.name, data.email, data.password, 0]
        );
    }

    static async find(email) {
       db.query(
            'SELECT * FROM admin WHERE email = ?', [email], function (err, result) {
                if (err) throw err;
                return result;
            }
        );
    }

    findAll() {
        return new Promise((resolve, reject) => {
            db.query({
                sql: 'SELECT * FROM admin'
            }, function(err, data) {
                if(err) reject(err);
                if(data.length) resolve(data);
            });
        });
    }

}   