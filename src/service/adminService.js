const db = require('../../util/database');

module.exports = class adminService {

    async save(data) {
        return db.query(
            'INSERT INTO admin (name, email, password, isDeleted) VALUES (?, ?, ?, ?)', [data.name, data.email, data.password, 0]
        );
    }

    async find(email) {
        return new Promise((res, rej) => {
            const query = 'SELECT * FROM admin WHERE email = ?';
            const data = email;
            db.query(query, [data], (err, result) => {
                if (err) rej(err);
                if (result.length === 0) rej(result);
                res(result);
            });
        }); 
    }

    async findById(id) {
        return new Promise((res, rej) => {
            const query = 'SELECT * FROM admin WHERE id = ?';
            const data = id;
                db.query(query, [data], (err, result) => {
                if (err) rej(err);
                if(result.length === 0) rej(result);
                res(result);
            });
        });
    }

    async updatePassword(id, pwd) {
        return new Promise((res, rej) => {
            const query =   'UPDATE admin SET password = ? WHERE id = ?';
            const data = [pwd, id];
            db.query( query, data, (err, result) => {
                if (err) rej(err);
                if (result.changedRows === 0) rej(result);
                res(result.changedRows === 1 ? true : false);
            });
        });
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            db.query({
                sql: 'SELECT * FROM admin'
            }, function(err, data) {
                if(err) reject(err);
                if(data.length === 0) reject(data);
                resolve(data);
            });
        });
    }
}